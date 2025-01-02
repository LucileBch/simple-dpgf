package com.simpledpgfapi.user.service;

import com.simpledpgfapi.global.exceptions.HttpException;
import com.simpledpgfapi.user.exceptions.InvitationErrorCodes;
import com.simpledpgfapi.user.exceptions.OrganizationErrorCodes;
import com.simpledpgfapi.user.mapper.OrganizationMapper;
import com.simpledpgfapi.user.model.invitation.Invitation;
import com.simpledpgfapi.user.model.invitation.InvitationStatusEnum;
import com.simpledpgfapi.user.model.invitation.dto.InvitationDto;
import com.simpledpgfapi.user.model.organization.Organization;
import com.simpledpgfapi.user.model.organization.dto.OrganizationCreationDto;
import com.simpledpgfapi.user.model.role.RoleEnum;
import com.simpledpgfapi.user.model.user.User;
import com.simpledpgfapi.user.model.user.dto.UserCreationDto;
import com.simpledpgfapi.user.model.user.dto.UserDto;
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
    private UserAuthenticationService userAuthenticationService;
    @Autowired
    private OrganizationRepository organizationRepository;
    @Autowired
    private OrganizationMapper organizationMapper;

    private Invitation createProjectOwnerInvitation(String senderEmail, ObjectId organizationId) {
        Invitation invitation = new Invitation();
        invitation.setRole(RoleEnum.PROJECT_OWNER);
        invitation.setEmail(senderEmail);

        String invitationToken = UUID.randomUUID().toString();
        invitation.setInvitationToken(invitationToken);
        invitation.setOrganizationId(organizationId);
        invitationRepository.save(invitation);

        return invitation;
    }

    private String generateInvitationLink(String invitationToken) {
        return "http://localhost:5173/invitation-link?invitationToken=" + invitationToken;
    }

    //TODO - LICENSE UTILISATEUR : incrémenter la license nombre utilisateurs
    public void sendProjectOwnerInvitation(InvitationDto invitationDto) {
        User currentUser = userService.getCurrentAuthenticatedUser();

        Invitation invitation = createProjectOwnerInvitation(currentUser.getEmail(), currentUser.getOrganizationId());

        String invitationLink = generateInvitationLink(invitation.getInvitationToken());

        emailService.sendInvitationMessage(invitationDto, currentUser.getEmail(), currentUser.getFirstName(), currentUser.getLastName(), invitationLink);
    }

    // resend invit, dont re increment organization user license
    public void resendProjectOwnerInvitation(InvitationDto invitationDto) {
        Invitation pendingInvitation = invitationRepository.findFirstByEmailAndInvitationStatusNot(invitationDto.getEmail(), InvitationStatusEnum.CANCELLED)
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, InvitationErrorCodes.INVITATION_NOT_FOUND));

        if(pendingInvitation.getInvitationStatus() == InvitationStatusEnum.CONSUMED) {
            throw new HttpException(HttpStatus.BAD_REQUEST, InvitationErrorCodes.INVITATION_CONSUMED);
        }

        pendingInvitation.setInvitationStatus(InvitationStatusEnum.CANCELLED);
        invitationRepository.save(pendingInvitation);

        User currentUser = userService.getCurrentAuthenticatedUser();

        Invitation invitation = createProjectOwnerInvitation(currentUser.getEmail(), currentUser.getOrganizationId());
        String invitationLink = generateInvitationLink(invitation.getInvitationToken());

        emailService.sendInvitationMessage(invitationDto, currentUser.getEmail(), currentUser.getFirstName(), currentUser.getLastName(), invitationLink);
    }

    public void deleteInvitation(ObjectId invitationId) {
        Invitation invitation = invitationRepository.findById(invitationId)
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, InvitationErrorCodes.INVITATION_NOT_FOUND));

        String invitationStatus = invitation.getInvitationStatus().name();

        if(invitationStatus.equals(InvitationStatusEnum.CONSUMED.name())) {
            throw new HttpException(HttpStatus.BAD_REQUEST, InvitationErrorCodes.INVITATION_CONSUMED);
        }

        if(invitationStatus.equals(InvitationStatusEnum.CANCELLED.name())) {
            throw new HttpException(HttpStatus.BAD_REQUEST, InvitationErrorCodes.INVITATION_CANCELLED);
        }

        invitation.setInvitationStatus(InvitationStatusEnum.CANCELLED);
        invitationRepository.save(invitation);
    }

    @Transactional
    public UserDto acceptInvitation(String invitationToken, UserCreationDto userCreationDto) {
        Invitation invitation = invitationRepository.findByInvitationToken(invitationToken)
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, InvitationErrorCodes.INVITATION_NOT_FOUND));

        if(invitation.getInvitationStatus() == InvitationStatusEnum.CANCELLED) {
            throw new HttpException(HttpStatus.BAD_REQUEST, InvitationErrorCodes.INVITATION_CANCELLED);
        }

        if(invitation.getInvitationStatus() == InvitationStatusEnum.CONSUMED) {
            throw new HttpException(HttpStatus.BAD_REQUEST, InvitationErrorCodes.INVITATION_ALREADY_ACCEPTED);
        }

        Organization organization = organizationRepository.findById(invitation.getOrganizationId())
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, OrganizationErrorCodes.ORGANIZATION_NOT_FOUND));
        OrganizationCreationDto organizationCreationDto = organizationMapper.modelToCreationDto(organization);

        invitation.setInvitationStatus(InvitationStatusEnum.CONSUMED);
        invitationRepository.save(invitation);

        userCreationDto.setOrganization(organizationCreationDto);
        return userAuthenticationService.createUser(userCreationDto, invitation.getRole());
    }

    public Invitation getValidInvitationByEmail(String email) {
        return invitationRepository.findFirstByEmailAndInvitationStatusNot(email, InvitationStatusEnum.CANCELLED)
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, InvitationErrorCodes.INVITATION_NOT_FOUND));
    }
}
