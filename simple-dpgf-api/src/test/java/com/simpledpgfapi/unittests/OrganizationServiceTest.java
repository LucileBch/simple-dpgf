package com.simpledpgfapi.unittests;

import com.simpledpgfapi.factory.OrganizationFactory;
import com.simpledpgfapi.factory.UserFactory;
import com.simpledpgfapi.global.service.GlobalUtils;
import com.simpledpgfapi.user.mapper.UserMapper;
import com.simpledpgfapi.user.model.organization.Organization;
import com.simpledpgfapi.user.model.organization.dto.OrganizationDto;
import com.simpledpgfapi.user.model.user.User;
import com.simpledpgfapi.user.model.user.dto.UserDto;
import com.simpledpgfapi.user.repository.UserRepository;
import com.simpledpgfapi.user.service.OrganizationService;
import org.assertj.core.api.BDDAssertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
 class OrganizationServiceTest {
    @Mock
    private UserMapper userMapper;
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private OrganizationService organizationService;

    @Test
    void testGetUserListByOrganizationId() {
        // GIVEN
        // create organization and userList
        Organization organization1 = OrganizationFactory.createOrganization("1");
        User user1 = UserFactory.createUser("1");
        user1.setOrganizationId(organization1.getId());
        User user2 = UserFactory.createUser("2");
        user2.setOrganizationId(organization1.getId());
        User user3 = UserFactory.createUser("3");
        user3.setOrganizationId(organization1.getId());
        List<User> userList = List.of(user1, user2, user3);

        // create organizaionDto and expectedUserDtoList
        OrganizationDto organizationDto1 = OrganizationFactory.createOrganizationDto("1");
        organizationDto1.setId(GlobalUtils.objectIdToString(organization1.getId()));
        UserDto userDto1 = UserFactory.createUserDto("1");
        userDto1.setOrganization(organizationDto1);
        UserDto userDto2 = UserFactory.createUserDto("2");
        userDto2.setOrganization(organizationDto1);

        UserDto userDto3 = UserFactory.createUserDto("3");
        userDto3.setOrganization(organizationDto1);
        List<UserDto> expectedUserDtoList = List.of(userDto1, userDto2, userDto3);

        // mock behaviour
        when(userRepository.findByOrganizationId(organization1.getId())).thenReturn(userList);
        when(userMapper.modelsToDtos(userList)).thenReturn(expectedUserDtoList);

        // WHEN
        List<UserDto> actualUserDtoList = organizationService.getUserListByOrganizationId(organization1.getId());

        // THEN
        BDDAssertions.then(actualUserDtoList).isNotNull();
        BDDAssertions.then(actualUserDtoList).hasSize(expectedUserDtoList.size());
        BDDAssertions.then(actualUserDtoList).containsExactlyInAnyOrderElementsOf(expectedUserDtoList);

        // verify interactions
        verify(userRepository).findByOrganizationId(organization1.getId());
        verify(userMapper).modelsToDtos(userList);
    }
}