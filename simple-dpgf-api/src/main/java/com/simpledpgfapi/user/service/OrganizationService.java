package com.simpledpgfapi.user.service;

import com.simpledpgfapi.global.exceptions.HttpException;
import com.simpledpgfapi.user.exceptions.OrganizationErrorCodes;
import com.simpledpgfapi.user.exceptions.UserErrorCodes;
import com.simpledpgfapi.user.mapper.InvitationMapper;
import com.simpledpgfapi.user.model.invitation.dto.InvitationDto;
import com.simpledpgfapi.user.model.organization.Organization;
import com.simpledpgfapi.user.model.organization.OrganizationTypeEnum;
import com.simpledpgfapi.user.model.user.User;
import com.simpledpgfapi.user.repository.InvitationRepository;
import com.simpledpgfapi.user.repository.OrganizationRepository;
import com.simpledpgfapi.user.repository.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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

    public Organization createAdminOrganization(String adminOrganizationName, OrganizationTypeEnum adminOrganizationType) {
        //Organization existingAdminOrganization = organizationRepository.findByName(adminOrganizationName);
        if( organizationRepository.findByName(adminOrganizationName) != null) {
            return null;
        }

        Organization adminOrganization = Organization.builder()
                .name(adminOrganizationName)
                .organizationType(adminOrganizationType)
                .build();

        organizationRepository.save(adminOrganization);
        return adminOrganization;
    }

    public Organization findByUserId(User user) {
        return organizationRepository.findById(user.getOrganizationId())
                .orElseThrow(()-> new HttpException(
                        HttpStatus.BAD_REQUEST,
                        OrganizationErrorCodes.ORGANIZATION_NOT_FOUND)
                );
    }

    public List<InvitationDto> getAllUsersByOrganizationId(ObjectId organizationId) {
        return invitationRepository.findByOrganizationId(organizationId)
                .stream()
                .map(invitationMapper::modelToDto)
                .toList();
    }

    // TODO - GESTION PROJETS : si il a des projets non delete, il faudra attribuer un nouveau userId
    // TODO - LICENSE UTILISATEUR : incrémenter la license nombre utilisateurs
    @Transactional
    public void removeUserFromOrganization(ObjectId organizationId, ObjectId userId) {
        User userToRemove = userRepository.findById(userId)
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, UserErrorCodes.USER_NOT_FOUND));

        if(!userToRemove.getOrganizationId().equals(organizationId)) {
            throw new HttpException(HttpStatus.BAD_REQUEST, OrganizationErrorCodes.NOT_IN_THIS_ORGANIZATION);
        }

        invitationRepository.deleteByEmailReceiver(userToRemove.getEmail());

        userRepository.delete(userToRemove);
    }
}
