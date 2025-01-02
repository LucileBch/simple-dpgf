package com.simpledpgfapi.user.service;

import com.simpledpgfapi.global.exceptions.HttpException;
import com.simpledpgfapi.user.exceptions.OrganizationErrorCodes;
import com.simpledpgfapi.user.exceptions.UserErrorCodes;
import com.simpledpgfapi.user.mapper.UserMapper;
import com.simpledpgfapi.user.model.invitation.Invitation;
import com.simpledpgfapi.user.model.organization.Organization;
import com.simpledpgfapi.user.model.user.User;
import com.simpledpgfapi.user.model.user.dto.UserDetailsDto;
import com.simpledpgfapi.user.repository.InvitationRepository;
import com.simpledpgfapi.user.repository.OrganizationRepository;
import com.simpledpgfapi.user.repository.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrganizationService {
    @Autowired
    private OrganizationRepository organizationRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private InvitationService invitationService;
    @Autowired
    private InvitationRepository invitationRepository;

    public Organization findByUserId(User user) {
        return organizationRepository.findById(user.getOrganizationId())
                .orElseThrow(()-> new HttpException(
                        HttpStatus.BAD_REQUEST,
                        OrganizationErrorCodes.ORGANIZATION_NOT_FOUND)
                );
    }

    public List<UserDetailsDto> getAllUsersByOrganizationId(ObjectId organizationId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserEmail = authentication.getName();

        User currentUser = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, UserErrorCodes.USER_NOT_FOUND));

        return userRepository.findByOrganizationId(organizationId).stream()
                .filter(user -> !user.getId().equals(currentUser.getId()))
                .map(user -> {
                    UserDetailsDto userDetailsDto = userMapper.modelToDetailsDto(user);

                    Invitation invitation = invitationService.getValidInvitationByEmail(user.getEmail());
                    userDetailsDto.setInvitationStatus(invitation.getInvitationStatus());
                    return userDetailsDto;
                })
                .collect(Collectors.toList());
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

        invitationRepository.deleteAllByEmail(userToRemove.getEmail());

        userRepository.delete(userToRemove);
    }
}
