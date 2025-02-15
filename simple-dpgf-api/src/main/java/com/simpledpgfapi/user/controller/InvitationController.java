package com.simpledpgfapi.user.controller;

import com.simpledpgfapi.user.model.invitation.dto.InvitationCreationDto;
import com.simpledpgfapi.user.model.user.dto.UserDto;
import com.simpledpgfapi.user.model.user.dto.UserInvitedDto;
import com.simpledpgfapi.user.service.InvitationService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping(value = "/invitation")
public class InvitationController {
    @Autowired
    private InvitationService invitationService;

    @PreAuthorize("hasAuthority('ROLE_ORGANIZATION_MANAGER')")
    @PostMapping
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public void sendTeamInvitation(@Valid @RequestBody InvitationCreationDto invitationCreationDto) {
        invitationService.sendProjectOwnerInvitation(invitationCreationDto);
    }

    @PostMapping("/accept")
    @ResponseStatus(value = HttpStatus.CREATED)
    public UserDto acceptTeamInvitation(@RequestParam String invitationToken, @Valid @RequestBody UserInvitedDto invitedUserDto) {
        return invitationService.acceptInvitation(invitationToken, invitedUserDto);
    }

    @PreAuthorize("hasAuthority('ROLE_ORGANIZATION_MANAGER')")
    @DeleteMapping("/{invitationId}")
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public void deleteTeamInvitation(@PathVariable ObjectId invitationId){
        invitationService.deleteInvitation(invitationId);
    }
}
