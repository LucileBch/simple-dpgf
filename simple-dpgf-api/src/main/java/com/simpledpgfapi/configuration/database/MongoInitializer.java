package com.simpledpgfapi.configuration.database;

import com.simpledpgfapi.admin.service.AdminUserService;
import com.simpledpgfapi.user.model.organization.Organization;
import com.simpledpgfapi.user.model.organization.OrganizationTypeEnum;
import com.simpledpgfapi.user.service.OrganizationService;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class MongoInitializer {
    @Autowired
    private AdminUserService adminService;
    @Autowired
    private OrganizationService organizationService;
    @Autowired
    private MongoConfiguration mongoConfiguration;

    @Value("${mongo.admin.firstname}")
    private String adminFirstName;
    @Value("${mongo.admin.lastname}")
    private String adminLastName;
    @Value("${mongo.admin.email}")
    private String adminEmail;
    @Value("${mongo.admin.password}")
    private String adminPassword;

    @PostConstruct
    public void initializaAdminOrganizationAndUser() {
        // Initialize Admin Organization
        Organization adminOrganization = organizationService.createAdminOrganization(
                "adminOrganization",
                OrganizationTypeEnum.ADMIN
        );

        if(adminOrganization != null) {
            // Initialize Admin User
            String adminUserFirstName = adminFirstName;
            String adminUserLastName = adminLastName;
            String adminUserEmail = adminEmail;
            String adminUserPassword = adminPassword;

           adminService.createAdminUser(
                    adminUserFirstName,
                    adminUserLastName,
                    adminUserEmail,
                    adminUserPassword,
                    adminOrganization.getId()
            );
        }
    }

    @PostConstruct
    private void initDataBaseIndex() {
        mongoConfiguration.initIndex();
    }
}
