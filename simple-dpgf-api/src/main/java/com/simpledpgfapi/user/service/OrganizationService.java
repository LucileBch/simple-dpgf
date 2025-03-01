package com.simpledpgfapi.user.service;

import com.simpledpgfapi.dpgf.model.dpgf.Dpgf;
import com.simpledpgfapi.dpgf.model.dpgf.DpgfStatusEnum;
import com.simpledpgfapi.dpgf.repository.DpgfRepository;
import com.simpledpgfapi.dpgf.service.DpgfService;
import com.simpledpgfapi.global.exceptions.HttpException;
import com.simpledpgfapi.user.exceptions.InvitationErrorCodes;
import com.simpledpgfapi.user.exceptions.OrganizationErrorCodes;
import com.simpledpgfapi.user.exceptions.UserErrorCodes;
import com.simpledpgfapi.user.mapper.InvitationMapper;
import com.simpledpgfapi.user.mapper.OrganizationMapper;
import com.simpledpgfapi.user.mapper.UserMapper;
import com.simpledpgfapi.user.model.invitation.Invitation;
import com.simpledpgfapi.user.model.invitation.dto.InvitationDto;
import com.simpledpgfapi.user.model.organization.Organization;
import com.simpledpgfapi.user.model.organization.OrganizationStatusEnum;
import com.simpledpgfapi.user.model.organization.OrganizationTypeEnum;
import com.simpledpgfapi.user.model.organization.dto.OrganizationDto;
import com.simpledpgfapi.user.model.organization.dto.OrganizationLicenseUpdateDto;
import com.simpledpgfapi.user.model.refreshtoken.RefreshToken;
import com.simpledpgfapi.user.model.user.User;
import com.simpledpgfapi.user.model.user.UserStatusEnum;
import com.simpledpgfapi.user.model.user.dto.UserDto;
import com.simpledpgfapi.user.repository.InvitationRepository;
import com.simpledpgfapi.user.repository.RefreshTokenRepository;
import com.simpledpgfapi.user.repository.UserRepository;
import com.simpledpgfapi.user.repository.organizationrepository.OrganizationRepository;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
public class OrganizationService {
    @Autowired
    private OrganizationRepository organizationRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private InvitationRepository invitationRepository;
    @Autowired
    private InvitationMapper invitationMapper;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private RefreshTokenRepository refreshTokenRepository;
    @Autowired
    private OrganizationMapper organizationMapper;
    @Autowired
    private UserService userService;
    @Autowired
    private DpgfRepository dpgfRepository;
    @Autowired
    private DpgfService dpgfService;
    @Autowired
    private LicenseService licenseService;

    public Organization createAdminOrganization(String adminOrganizationName, OrganizationTypeEnum adminOrganizationType) {
        Organization existingAdminOrganization = organizationRepository.findByName(adminOrganizationName);
        if(existingAdminOrganization != null) {
            log.info("Admin Organization already exists : {}", existingAdminOrganization.getId());
            return existingAdminOrganization;
        }

        Organization adminOrganization = new Organization();
            adminOrganization.setName(adminOrganizationName);
            adminOrganization.setOrganizationType(adminOrganizationType);
            adminOrganization.setMaxMemberLicenseCounter(1.);
            adminOrganization.setMaxProjectLicenseCounter(1.);


//                Organization.builder()
//                        .name(adminOrganizationName)
//                        .organizationType(adminOrganizationType)
//                        .maxMemberLicenseCounter(1.)
//                        .memberLicenseCounter(1.)
//                        .build();

        organizationRepository.save(adminOrganization);
        log.info("Admin Organization created with Id : {}", adminOrganization.getId());
        return adminOrganization;
    }

    public List<UserDto> getUserListByOrganizationId(ObjectId organizationId) {
        List<User> userList = userRepository.findByOrganizationId(organizationId);
        return userMapper.modelsToDtos(userList);
    }

    public List<InvitationDto> getInvitationListByOrganizationId(ObjectId organizationId) {
        return invitationRepository.findByOrganizationId(organizationId)
                .stream()
                .map(invitationMapper::modelToDto)
                .toList();
    }

    @Transactional
    public void removeUserFromOrganization(ObjectId organizationId, ObjectId invitationId) {
        Invitation currentInvitation = invitationRepository.findById(invitationId)
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, InvitationErrorCodes.INVITATION_NOT_FOUND));

        User userToRemove = userRepository.findByEmail(currentInvitation.getEmailReceiver())
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, UserErrorCodes.USER_NOT_FOUND));

        if(!userToRemove.getOrganizationId().equals(organizationId)) {
            throw new HttpException(HttpStatus.BAD_REQUEST, OrganizationErrorCodes.NOT_IN_THIS_ORGANIZATION);
        }

        List<Dpgf> dpgfList = dpgfRepository.findByUserId(userToRemove.getId());
        dpgfList.forEach(dpgf -> {
            dpgf.setDpgfStatus(DpgfStatusEnum.DELETED);
            dpgfRepository.save(dpgf);
            dpgfService.updateLotStatus(dpgf);
            dpgfService.updateProductStatus(dpgf);
        });

        invitationRepository.deleteByEmailReceiver(userToRemove.getEmail());
        licenseService.releaseUserLicenseCounter(userToRemove);
        userRepository.delete(userToRemove);
    }

    @Transactional
    public void deleteOrganizationById(ObjectId organizationId) {
        // organization status to deleted
        Organization organizationToDelete = organizationRepository.findById(organizationId).orElseThrow(() ->
            new HttpException(HttpStatus.BAD_REQUEST, OrganizationErrorCodes.ORGANIZATION_NOT_FOUND));

        throwIfOrganizationDeleted(organizationToDelete);

        organizationToDelete.setOrganizationStatus(OrganizationStatusEnum.DELETED);
        organizationRepository.save(organizationToDelete);

        // update status in dpgf and associated itesm
        updateDpgfStatusAndAssociatedLotAndProducts(organizationToDelete.getId());

        // user status to deleted
        List<User> userToDelete = userRepository.findByOrganizationId(organizationToDelete.getId());
        userToDelete.forEach(user -> user.setUserStatus(UserStatusEnum.DELETED));
        userRepository.saveAll(userToDelete);

        // delete refreshTokens
        List<ObjectId> userIds = userToDelete.stream().map(User::getId).toList();
        userIds.forEach(userId -> {
                    List<RefreshToken> refreshTokenList = refreshTokenRepository.findByUserId(userId);
                    refreshTokenRepository.deleteAll(refreshTokenList);
        });
    }

    public OrganizationDto updateOrganizationLicenses(ObjectId organizationId, OrganizationLicenseUpdateDto organizationLicenseUpdateDto) {
        Organization organizationToUpdate = organizationRepository.findById(organizationId).orElseThrow(() ->
                new HttpException(HttpStatus.BAD_REQUEST, OrganizationErrorCodes.ORGANIZATION_NOT_FOUND));

        throwIfOrganizationDeleted(organizationToUpdate);

        organizationToUpdate.setMemberLicenseCounter(organizationLicenseUpdateDto.getMemberLicenseCounter());
        organizationToUpdate.setMaxMemberLicenseCounter(organizationLicenseUpdateDto.getMaxMemberLicenseCounter());
        organizationToUpdate.setProjectLicenseCounter(organizationLicenseUpdateDto.getProjectLicenseCounter());
        organizationToUpdate.setMaxProjectLicenseCounter(organizationLicenseUpdateDto.getMaxProjectLicenseCounter());
        organizationRepository.save(organizationToUpdate);

        return organizationMapper.modelToDto(organizationToUpdate);
    }

    public OrganizationDto getOrganizationByUserId() {
        User currentUser = userService.getCurrentAuthenticatedUser();
        Organization currentOrganization = organizationRepository.findById(currentUser.getOrganizationId())
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, OrganizationErrorCodes.ORGANIZATION_NOT_FOUND));
        return organizationMapper.modelToDto(currentOrganization);
    }

    // utils
    private void throwIfOrganizationDeleted(Organization organization) {
        if(organization.getOrganizationStatus() == OrganizationStatusEnum.DELETED) {
            throw new HttpException(HttpStatus.BAD_REQUEST, OrganizationErrorCodes.ORGANIZATION_ALREADY_DELETED);
        }
    }

    private void updateDpgfStatusAndAssociatedLotAndProducts(ObjectId organizationId) {
        List<Dpgf> dpgfList = dpgfRepository.findByOrganizationId(organizationId);
        dpgfList.forEach(dpgf -> {
            dpgf.setDpgfStatus(DpgfStatusEnum.DELETED);
            dpgfRepository.save(dpgf);
            dpgfService.updateLotStatus(dpgf);
            dpgfService.updateProductStatus(dpgf);
        });
    }
}
