package com.simpledpgfapi.admin.service;

import com.simpledpgfapi.user.mapper.OrganizationMapper;
import com.simpledpgfapi.user.model.organization.Organization;
import com.simpledpgfapi.user.model.organization.dto.OrganizationDto;
import com.simpledpgfapi.user.model.role.RoleEnum;
import com.simpledpgfapi.user.model.user.User;
import com.simpledpgfapi.user.repository.OrganizationRepository;
import com.simpledpgfapi.user.repository.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminUserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private OrganizationRepository organizationRepository;
    @Autowired
    private OrganizationMapper organizationMapper;

    public User createAdminUser(
            String adminUserFirstName,
            String adminUserLastName,
            String adminUserEmail,
            String adminUserPassword, ObjectId adminOrganizationId) {
        if(userRepository.findByEmail(adminUserEmail).isPresent()) {
            return null;
        }

        String cryptedPassword = bCryptPasswordEncoder.encode(adminUserPassword);

        User adminUser = User.builder()
                .firstName(adminUserFirstName)
                .lastName(adminUserLastName)
                .email(adminUserEmail)
                .password(cryptedPassword)
                .isAccountActivated(true)
                .role(RoleEnum.ADMIN)
                .organizationId(adminOrganizationId)
                .build();

        userRepository.save(adminUser);
        return adminUser;
    }

    public List<OrganizationDto> getAllOrganizations() {
         List<Organization> organizationList = organizationRepository.findAll();

        return organizationList.stream()
                 .map(organizationMapper::modelToDto)
                 .toList();
    }
}
