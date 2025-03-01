package com.simpledpgfapi.admin.service;

import com.simpledpgfapi.dpgf.repository.DpgfRepository;
import com.simpledpgfapi.global.exceptions.HttpException;
import com.simpledpgfapi.user.exceptions.OrganizationErrorCodes;
import com.simpledpgfapi.user.mapper.OrganizationMapper;
import com.simpledpgfapi.user.model.organization.Organization;
import com.simpledpgfapi.user.model.organization.OrganizationStatusEnum;
import com.simpledpgfapi.user.model.organization.OrganizationTypeEnum;
import com.simpledpgfapi.user.model.organization.dto.OrganizationDto;
import com.simpledpgfapi.user.model.role.RoleEnum;
import com.simpledpgfapi.user.model.user.User;
import com.simpledpgfapi.user.repository.UserRepository;
import com.simpledpgfapi.user.repository.organizationrepository.OrganizationRepository;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
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
    @Autowired
    private DpgfRepository dpgfRepository;

    public User createAdminUser(
            String adminUserFirstName,
            String adminUserLastName,
            String adminUserEmail,
            String adminUserPassword, ObjectId adminOrganizationId) {
        if(userRepository.findByEmail(adminUserEmail).isPresent()) {
            log.info("Admin User already exists");
            return null;
        }

        String cryptedPassword = bCryptPasswordEncoder.encode(adminUserPassword);

        User adminUser = new User();
            adminUser.setFirstName(adminUserFirstName);
            adminUser.setLastName(adminUserLastName);
            adminUser.setEmail(adminUserEmail);
            adminUser.setPassword(cryptedPassword);
            adminUser.setAccountActivated(true);
            adminUser.setRole(RoleEnum.ADMIN);
            adminUser.setOrganizationId(adminOrganizationId);

//                .firstName(adminUserFirstName)
//                .lastName(adminUserLastName)
//                .email(adminUserEmail)
//                .password(cryptedPassword)
//                .isAccountActivated(true)
//                .role(RoleEnum.ADMIN)
//                .organizationId(adminOrganizationId)
//                .build();

        userRepository.save(adminUser);
        log.info("Admin User created with Id : {}", adminUser.getId());

        return adminUser;
    }

    public List<OrganizationDto> getAllOrganizations() {
         List<Organization> organizationList = organizationRepository.findByOrganizationStatusNotAndOrganizationTypeNot(
                 OrganizationStatusEnum.DELETED,
                 OrganizationTypeEnum.ADMIN);

        return organizationList.stream()
                 .map(organizationMapper::modelToDto)
                 .toList();
    }

    public OrganizationDto getOrganizationById(ObjectId organizationId) {
        Organization currentOrganization = organizationRepository.findById(organizationId).orElseThrow(() -> new HttpException(
                HttpStatus.BAD_REQUEST,
                OrganizationErrorCodes.ORGANIZATION_NOT_FOUND));

       return organizationMapper.modelToDto(currentOrganization);
    }
}
