package com.simpledpgfapi.configuration.database;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
public class MongoInitializer {

    @Autowired
    private MongoClient mongoClient;

    @Value("${spring.data.mongodb.database}")
    private String database;
    @Value("${mongo.admin.username}")
    private String adminUser;
    @Value("${mongo.admin.password}")
    private String adminPassword;
    @Value("${mongo.app.username}")
    private String appUser;
    @Value("${mongo.app.password}")
    private String appPassword;


    @PostConstruct
    @Profile("dev")
    public void initAdminUser() {
        try {
        // Connecte-toi à la base admin
        MongoDatabase adminDatabase = mongoClient.getDatabase("admin");

        // user for Dev Vérifie si l'utilisateur existe déjà
        Document existingAdminUser = adminDatabase.runCommand(new Document("usersInfo", adminUser));
        if (existingAdminUser.getList("users", Document.class).isEmpty()) {
            // Si l'utilisateur n'existe pas, crée-le
            adminDatabase.runCommand(new Document("createUser", adminUser)
                    .append("pwd", adminPassword)
                    .append("roles", List.of(
                            new Document("role", "dbOwner").append("db", database)
                    ))
            );
            log.info("Admin user created succesfully");
        } else {
            log.info("Admin user already exists");
        }
    } catch (Exception e) {
            log.error("Error during MongoDB initialization for admin user: {}", e.getMessage());
        }
    }

    @PostConstruct
    @Profile("prod")
    public void initAppUser() {
        try {
            // Connecte-toi à la base admin
            MongoDatabase adminDatabase = mongoClient.getDatabase("admin");

            // user for prod
            Document existingAppUser = adminDatabase.runCommand(new Document("usersInfo", appUser));
            if (existingAppUser.getList("users", Document.class).isEmpty()) {
                // Si l'utilisateur n'existe pas, crée-le
                adminDatabase.runCommand(new Document("createUser", appUser)
                        .append("pwd", appPassword)
                        .append("roles", List.of(
                                new Document("role", "readWrite").append("db", database)
                        ))
                );
                log.info("App user created succesfully");
            } else {
                log.info("App user already exists");
            }
        } catch (Exception e) {
            log.error("Error during MongoDB initialization for app user : {}", e.getMessage());
        }
    }
}
