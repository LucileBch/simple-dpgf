package com.simpledpgfapi.user.controller;

import com.simpledpgfapi.user.model.invitation.dto.InvitationDto;
import com.simpledpgfapi.user.model.organization.dto.OrganizationDto;
import com.simpledpgfapi.user.model.organization.dto.OrganizationLicenseUpdateDto;
import com.simpledpgfapi.user.model.user.dto.UserDto;
import com.simpledpgfapi.user.service.OrganizationService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/organization")
public class OrganizationController {
    @Autowired
    private OrganizationService organizationService;

    // Role ADMIN
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping("/{organizationId}/member-list")
    public List<UserDto> getAllUsersByOrganizationId(@PathVariable ObjectId organizationId) {
        return organizationService.getUserListByOrganizationId(organizationId);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("/{organizationId}")
    public void deleteOrganizationById(@PathVariable ObjectId organizationId) {
        organizationService.deleteOrganizationById(organizationId);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PutMapping("/{organizationId}/update-license")
    public OrganizationDto updateOrganizationLicense(@PathVariable ObjectId organizationId,
                                                     @Valid @RequestBody OrganizationLicenseUpdateDto organizationLicenseUpdateDto) {
        return organizationService.updateOrganizationLicenses(organizationId, organizationLicenseUpdateDto);
    }

    // Role ORGANIZATION_MANAGER
    @PreAuthorize("hasAuthority('ROLE_ORGANIZATION_MANAGER')")
    @GetMapping("/{organizationId}/invitation-list")
    public List<InvitationDto> getUserInvitationByOrganizationId(@PathVariable ObjectId organizationId) {
        return organizationService.getInvitationListByOrganizationId(organizationId);
    }

    @PreAuthorize("hasAuthority('ROLE_ORGANIZATION_MANAGER')")
    @DeleteMapping("/{organizationId}/member/{userId}")
    @ResponseStatus(value = HttpStatus.OK)
    public void removeMemberFromOrganization(@PathVariable ObjectId organizationId, @PathVariable ObjectId userId) {
        organizationService.removeUserFromOrganization(organizationId, userId);
    }
}
