package com.simpledpgfapi.admin.controller;

import com.simpledpgfapi.admin.service.AdminUserService;
import com.simpledpgfapi.user.model.organization.dto.OrganizationDto;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/admin")
public class AdminUserController {
    @Autowired
    private AdminUserService adminUserService;

    // GET ALL ORGANIZATION
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping("/organizations")
    public List<OrganizationDto> getAllOrganizations() {
        return adminUserService.getAllOrganizations();
    }

    // GET ONE ORGA BY ID
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping("/organization/{organizationId}")
    public OrganizationDto getOrganizationById(@PathVariable ObjectId organizationId) {
        return adminUserService.getOrganizationById(organizationId);
    }

    // UPDATE MEMBER LICENSE

    // UPDATE PROJECTS LICENSE
}
