package com.simpledpgfapi.user.service;

import com.simpledpgfapi.global.exceptions.HttpException;
import com.simpledpgfapi.user.exceptions.InvitationErrorCodes;
import com.simpledpgfapi.user.exceptions.OrganizationErrorCodes;
import com.simpledpgfapi.user.mapper.OrganizationMapper;
import com.simpledpgfapi.user.mapper.UserMapper;
import com.simpledpgfapi.user.model.invitation.Invitation;
import com.simpledpgfapi.user.model.invitation.InvitationStatusEnum;
import com.simpledpgfapi.user.model.invitation.dto.InvitationCreationDto;
import com.simpledpgfapi.user.model.organization.Organization;
import com.simpledpgfapi.user.model.organization.dto.OrganizationCreationDto;
import com.simpledpgfapi.user.model.role.RoleEnum;
import com.simpledpgfapi.user.model.user.User;
import com.simpledpgfapi.user.model.user.dto.UserCreationDto;
import com.simpledpgfapi.user.model.user.dto.UserDto;
import com.simpledpgfapi.user.model.user.dto.UserInvitedDto;
import com.simpledpgfapi.user.repository.InvitationRepository;
import com.simpledpgfapi.user.repository.OrganizationRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class InvitationService {
    @Autowired
    private InvitationRepository invitationRepository;
    @Autowired
    private EmailService emailService;
    @Autowired
    private UserService userService;
    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    private OrganizationRepository organizationRepository;
    @Autowired
    private OrganizationMapper organizationMapper;
    @Autowired
    private UserMapper userMapper;

    //TODO - LICENSE UTILISATEUR : incrémenter la license nombre utilisateurs
    // WARNING si invit existante ne pas incrémenter
    public void sendProjectOwnerInvitation(InvitationCreationDto invitationCreationDto) {
        User currentUser = userService.getCurrentAuthenticatedUser();

        Invitation existingInvitation = invitationRepository.findByEmailReceiver(invitationCreationDto.getEmailReceiver());

        if(existingInvitation != null) {
            if(existingInvitation.getInvitationStatus() == InvitationStatusEnum.CONSUMED) {
                throw new HttpException(HttpStatus.BAD_REQUEST, InvitationErrorCodes.INVITATION_CONSUMED);
            }

            if(existingInvitation.getInvitationStatus() == InvitationStatusEnum.PENDING) {
                invitationRepository.delete(existingInvitation);
            }
        }

        Invitation invitation = createProjectOwnerInvitation(currentUser.getEmail(), invitationCreationDto, currentUser.getOrganizationId());

        String invitationLink = generateInvitationLink(invitation.getInvitationToken());

        emailService.sendInvitationMessage(invitationCreationDto, currentUser.getEmail(), currentUser.getFirstName(), currentUser.getLastName(), invitationLink);
    }

    public void deleteInvitation(ObjectId invitationId) {
        Invitation invitation = invitationRepository.findById(invitationId)
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, InvitationErrorCodes.INVITATION_NOT_FOUND));

        if(invitation.getInvitationStatus().name().equals(InvitationStatusEnum.CONSUMED.name())) {
            throw new HttpException(HttpStatus.BAD_REQUEST, InvitationErrorCodes.INVITATION_CONSUMED);
        }

        invitationRepository.delete(invitation);
    }

    @Transactional
    public UserDto acceptInvitation(String invitationToken, UserInvitedDto userInvitedDto) {
        Invitation invitation = invitationRepository.findByInvitationToken(invitationToken)
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, InvitationErrorCodes.INVITATION_NOT_FOUND));

        if(invitation.getInvitationStatus() == InvitationStatusEnum.CONSUMED) {
            throw new HttpException(HttpStatus.BAD_REQUEST, InvitationErrorCodes.INVITATION_ALREADY_ACCEPTED);
        }

        Organization organization = organizationRepository.findById(invitation.getOrganizationId())
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, OrganizationErrorCodes.ORGANIZATION_NOT_FOUND));
        OrganizationCreationDto organizationCreationDto = organizationMapper.modelToCreationDto(organization);

        invitation.setInvitationStatus(InvitationStatusEnum.CONSUMED);
        invitationRepository.save(invitation);

        UserCreationDto userCreationDto = userMapper.invitedToCreationDto(userInvitedDto);
        userCreationDto.setOrganization(organizationCreationDto);
        return authenticationService.createUser(userCreationDto, RoleEnum.PROJECT_OWNER);
    }

    private Invitation createProjectOwnerInvitation(String emailSender, InvitationCreationDto invitationCreationDto, ObjectId organizationId) {
        Invitation invitation = new Invitation();
        invitation.setRole(RoleEnum.PROJECT_OWNER);
        invitation.setEmailSender(emailSender);
        invitation.setFirstName(invitationCreationDto.getFirstName());
        invitation.setLastName(invitationCreationDto.getLastName());
        invitation.setEmailReceiver(invitationCreationDto.getEmailReceiver());

        String invitationToken = UUID.randomUUID().toString();
        invitation.setInvitationToken(invitationToken);
        invitation.setOrganizationId(organizationId);
        invitationRepository.save(invitation);

        return invitation;
    }

    private String generateInvitationLink(String invitationToken) {
        return "http://localhost:5173/invitation-link?invitationToken=" + invitationToken;
    }
}
