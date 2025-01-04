package com.simpledpgfapi.configuration.database;

import com.simpledpgfapi.admin.service.AdminUserService;
import com.simpledpgfapi.user.model.user.User;
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

    @Value("${mongo.admin.firstname}")
    private String adminFirstName;
    @Value("${mongo.admin.lastname}")
    private String adminLastName;
    @Value("${mongo.admin.email}")
    private String adminEmail;
    @Value("${mongo.admin.password}")
    private String adminPassword;

    @PostConstruct
    public void initializeAdminUser() {
        String adminUserFirstName = adminFirstName;
        String adminUserLastName = adminLastName;
        String adminUserEmail = adminEmail;
        String adminUserPassword = adminPassword;

        User adminUser = adminService.createAdminUser(
                adminUserFirstName,
                adminUserLastName,
                adminUserEmail,
                adminUserPassword
        );

        if(adminUser != null) {
            log.info("Admin User Created.");
        } else {
            log.info("Admin User already exists.");
        }
    }
}
