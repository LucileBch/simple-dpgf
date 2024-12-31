package com.simpledpgfapi.user.controller;

import com.simpledpgfapi.user.model.user.dto.UserDetailsDto;
import com.simpledpgfapi.user.service.OrganizationService;
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

    @PreAuthorize("hasAnyAuthority('ROLE_ORGANIZATION_MANAGER')")
    @GetMapping("/{organizationId}/members")
    public List<UserDetailsDto> getAllUsersByOrganization(@PathVariable ObjectId organizationId) {
        return organizationService.getAllUsersByOrganizationId(organizationId);
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ORGANIZATION_MANAGER')")
    @DeleteMapping("/{organizationId}/member/{userId}")
    @ResponseStatus(value = HttpStatus.OK)
    public void removeMemberFromOrganization(@PathVariable ObjectId organizationId, @PathVariable ObjectId userId) {
        organizationService.removeUserFromOrganization(organizationId, userId);
    }
}
