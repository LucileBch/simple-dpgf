package com.simpledpgfapi.user.service;

import com.simpledpgfapi.global.exceptions.HttpException;
import com.simpledpgfapi.user.exceptions.InvitationErrorCodes;
import com.simpledpgfapi.user.exceptions.OrganizationErrorCodes;
import com.simpledpgfapi.user.exceptions.UserErrorCodes;
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
import com.simpledpgfapi.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
    private UserRepository userRepository;
    @Autowired
    private UserAuthenticationService userAuthenticationService;
    @Autowired
    private OrganizationRepository organizationRepository;
    @Autowired
    private OrganizationMapper organizationMapper;

    public void inviteProjectOwner(InvitationDto invitationDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserEmail = authentication.getName();

        User currentUser = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, UserErrorCodes.USER_NOT_FOUND));

        Invitation invitation = new Invitation();
        invitation.setRole(RoleEnum.PROJECT_OWNER);
        invitation.setEmail(invitationDto.getEmail());

        String invitationToken = UUID.randomUUID().toString();
        invitation.setInvitationToken(invitationToken);
        invitation.setOrganizationId(currentUser.getOrganizationId());
        invitationRepository.save(invitation);

        String invitationLink = "http://localhost:5173/invitation-link?invitationToken=" + invitationToken;
        emailService.sendInvitationMessage(invitationDto, currentUserEmail, currentUser.getFirstName(), currentUser.getLastName(), invitationLink);
    }

    @Transactional
    public UserDto acceptInvitation(String invitationToken, UserCreationDto userCreationDto) {
        Invitation invitation = invitationRepository.findByInvitationToken(invitationToken)
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, InvitationErrorCodes.INVITATION_NOT_FOUND));

        if(invitation.getInvitationStatus() == InvitationStatusEnum.CANCELLED) {
            throw new HttpException(HttpStatus.BAD_REQUEST, InvitationErrorCodes.INVITATION_CANCELLED);
        }

        if(invitation.getInvitationStatus() == InvitationStatusEnum.CONSUMED) {
            throw new HttpException(HttpStatus.BAD_REQUEST, InvitationErrorCodes.INVITATION_CONSUMED);
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
        return invitationRepository.findFirstByEmailAndInvitationStatusNot(email, InvitationStatusEnum.REVOKED)
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, InvitationErrorCodes.INVITATION_NOT_FOUND));
    }
}
