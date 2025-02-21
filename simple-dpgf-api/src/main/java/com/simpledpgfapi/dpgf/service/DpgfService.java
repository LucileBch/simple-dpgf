package com.simpledpgfapi.dpgf.service;

import com.simpledpgfapi.dpgf.exceptions.DpgfErrorCodes;
import com.simpledpgfapi.dpgf.mapper.DpgfMapper;
import com.simpledpgfapi.dpgf.model.dpgf.Dpgf;
import com.simpledpgfapi.dpgf.model.dpgf.DpgfStatusEnum;
import com.simpledpgfapi.dpgf.model.dpgf.dto.DpgfCreationDto;
import com.simpledpgfapi.dpgf.model.dpgf.dto.DpgfDto;
import com.simpledpgfapi.dpgf.repository.DpgfRepository;
import com.simpledpgfapi.global.exceptions.HttpException;
import com.simpledpgfapi.user.exceptions.OrganizationErrorCodes;
import com.simpledpgfapi.user.exceptions.UserErrorCodes;
import com.simpledpgfapi.user.model.organization.Organization;
import com.simpledpgfapi.user.model.user.User;
import com.simpledpgfapi.user.repository.UserRepository;
import com.simpledpgfapi.user.repository.organizationrepository.OrganizationRepository;
import com.simpledpgfapi.user.service.LicenseService;
import com.simpledpgfapi.user.service.OrganizationService;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Slf4j
@Service
public class DpgfService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OrganizationService organizationService;
    @Autowired
    private DpgfMapper dpgfMapper;
    @Autowired
    private DpgfRepository dpgfRepository;
    @Autowired
    private LicenseService licenseService;
    @Autowired
    private OrganizationRepository organizationRepository;

    @Transactional
    public DpgfDto createDpgf(DpgfCreationDto dpgfCreationDto) {
        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        User currentUser = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, UserErrorCodes.USER_NOT_FOUND));

        Organization organization = organizationService.findByUserId(currentUser);

        // transform in model
        Dpgf newDpgf = dpgfMapper.creationDtoToModel(dpgfCreationDto);
        newDpgf.setOrganizationId(organization.getId());
        newDpgf.setUserId(currentUser.getId());
        dpgfRepository.save(newDpgf);

        licenseService.incrementProjectLicenseCounter(currentUser);

        DpgfDto dpgfToReturn =  dpgfMapper.modelToDto(newDpgf);
        dpgfToReturn.setCreatedByUser(currentUser.getFirstName() + " " + currentUser.getLastName());
        return dpgfToReturn;
    }

    public List<DpgfDto> getDpgfListByUserId() {
        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        User currentUser = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, UserErrorCodes.USER_NOT_FOUND));

        List<Dpgf> dpgfList = dpgfRepository.findByUserIdAndDpgfStatusNot(currentUser.getId(), DpgfStatusEnum.DELETED);
        List<DpgfDto> dpgfDtoList = dpgfMapper.modelsToDtos(dpgfList);
        dpgfDtoList.forEach(dpgfDto -> dpgfDto.setCreatedByUser(currentUser.getFirstName() + " " + currentUser.getLastName()));
        return dpgfDtoList;
    }

    public List<DpgfDto> getDpgfListByOrganizationId(ObjectId organizationId) {
        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        User currentUser = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, UserErrorCodes.USER_NOT_FOUND));

        Organization currentOrganization = organizationRepository.findById(organizationId)
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, OrganizationErrorCodes.ORGANIZATION_NOT_FOUND));

        if(!Objects.equals(currentUser.getOrganizationId(), currentOrganization.getId())) {
            throw new HttpException(HttpStatus.BAD_REQUEST, OrganizationErrorCodes.USER_NOT_IN_ORGANIZATION);
        }

        List<Dpgf> dpgfList = dpgfRepository.findByOrganizationIdAndDpgfStatusNot(currentOrganization.getId(), DpgfStatusEnum.DELETED);
        List<DpgfDto> dpgfDtoList = dpgfMapper.modelsToDtos(dpgfList);
        dpgfDtoList.forEach(dpgfDto -> {
                    String userEmail = dpgfDto.getCreatedByUser();
                    User userOwner = userRepository.findByEmail(userEmail).orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, UserErrorCodes.USER_NOT_FOUND));
                    dpgfDto.setCreatedByUser(userOwner.getFirstName() + " " + userOwner.getLastName());
        });

        return dpgfDtoList;
    }

    public void updateDpgfStatusById(ObjectId dpgfId, DpgfStatusEnum dpgfStatus) {
        Dpgf dpgfToUpdate = dpgfRepository.findById(dpgfId)
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, DpgfErrorCodes.DPGF_NOT_FOUND));

        if (dpgfToUpdate.getDpgfStatus().equals(DpgfStatusEnum.DELETED)) {
            throw new HttpException(HttpStatus.BAD_REQUEST, DpgfErrorCodes.DPGF_ALREADY_DELETED);
        } else {
            dpgfToUpdate.setDpgfStatus(dpgfStatus);
            dpgfRepository.save(dpgfToUpdate);
        }
    }

    @Transactional
    public void deleteDpgfById(ObjectId dpgfId) {
        Dpgf dpgfToDelete = dpgfRepository.findById(dpgfId)
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, DpgfErrorCodes.DPGF_NOT_FOUND));

        if (dpgfToDelete.getDpgfStatus().equals(DpgfStatusEnum.DELETED)) {
            throw new HttpException(HttpStatus.BAD_REQUEST, DpgfErrorCodes.DPGF_ALREADY_DELETED);
        } else if (!dpgfToDelete.getDpgfStatus().equals(DpgfStatusEnum.ARCHIVED)) {
            throw new HttpException(HttpStatus.BAD_REQUEST, DpgfErrorCodes.DPGF_SHOULD_BE_ARCHIVED);
        } else {
            dpgfToDelete.setDpgfStatus(DpgfStatusEnum.DELETED);
            dpgfRepository.save(dpgfToDelete);

            User currentUser = userRepository.findById(dpgfToDelete.getUserId())
                    .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, UserErrorCodes.USER_NOT_FOUND));
            licenseService.releaseProjectLicenseCounter(currentUser);
        }
    }

    // utils
    public void throwIfDpgfStatusNotValidForCreateOrUpdate(ObjectId dpgfId) {
        Dpgf dpgfToCheck = dpgfRepository.findById(dpgfId)
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, DpgfErrorCodes.DPGF_NOT_FOUND));

        if (dpgfToCheck.getDpgfStatus().equals(DpgfStatusEnum.DELETED)) {
            throw new HttpException(HttpStatus.BAD_REQUEST, DpgfErrorCodes.DPGF_ALREADY_DELETED);
        } else if (dpgfToCheck.getDpgfStatus().equals(DpgfStatusEnum.ARCHIVED)) {
            throw new HttpException(HttpStatus.BAD_REQUEST, DpgfErrorCodes.DPGF_ARCHIVED);
        }
    }

    public void throwIfDpgfStatusNotValidForDisplay(ObjectId dpgfId) {
        Dpgf dpgfToCheck = dpgfRepository.findById(dpgfId)
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, DpgfErrorCodes.DPGF_NOT_FOUND));

        if (dpgfToCheck.getDpgfStatus().equals(DpgfStatusEnum.DELETED)) {
            throw new HttpException(HttpStatus.BAD_REQUEST, DpgfErrorCodes.DPGF_ALREADY_DELETED);
        }
    }
}
