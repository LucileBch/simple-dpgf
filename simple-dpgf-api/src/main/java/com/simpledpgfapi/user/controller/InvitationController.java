package com.simpledpgfapi.user.controller;

import com.simpledpgfapi.user.model.invitation.dto.InvitationDto;
import com.simpledpgfapi.user.model.user.dto.UserCreationDto;
import com.simpledpgfapi.user.model.user.dto.UserDto;
import com.simpledpgfapi.user.service.InvitationService;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping(value = "/invite")
public class InvitationController {
    @Autowired
    private InvitationService invitationService;

    @PreAuthorize("hasAuthority('ROLE_ORGANIZATION_MANAGER')")
    @PostMapping
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public void sendTeamInvitation(@RequestBody InvitationDto invitationDto) {
        invitationService.sendProjectOwnerInvitation(invitationDto);
    }

    @PostMapping("/accept")
    @ResponseStatus(value = HttpStatus.CREATED)
    public UserDto acceptTeamInvitation(@RequestParam String invitationToken, @RequestBody UserCreationDto userCreationDto) {
        return invitationService.acceptInvitation(invitationToken, userCreationDto);
    }

    @PreAuthorize("hasAuthority('ROLE_ORGANIZATION_MANAGER')")
    @PostMapping("/resend")
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public void resendTeamInvitation(@RequestBody InvitationDto invitationDto){
        invitationService.resendProjectOwnerInvitation(invitationDto);
    }

    @PreAuthorize("hasAuthority('ROLE_ORGANIZATION_MANAGER')")
    @DeleteMapping("/{invitationId}")
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public void deleteTeamInvitation(@PathVariable ObjectId invitationId){
        invitationService.deleteInvitation(invitationId);
    }
}
