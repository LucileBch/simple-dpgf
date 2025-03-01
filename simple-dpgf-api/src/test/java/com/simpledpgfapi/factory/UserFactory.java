package com.simpledpgfapi.factory;

import com.simpledpgfapi.global.service.GlobalUtils;
import com.simpledpgfapi.user.model.role.RoleEnum;
import com.simpledpgfapi.user.model.user.User;
import com.simpledpgfapi.user.model.user.UserStatusEnum;
import com.simpledpgfapi.user.model.user.dto.UserDto;

public class UserFactory {
    // don't forget to add number
    public static final String TEST_USER_ID = "636d03893414c35ca6a904b";

    public static User createUser(String number) {
        User user = new User();

        user.setId(GlobalUtils.stringToObjectId(TEST_USER_ID + number));
        user.setFirstName("userFirstName" + number);
        user.setLastName("userLastName" + number);
        user.setEmail("user" + number + "@email.com");
        user.setPassword("UserPass*"+ number );
        user.setAccountActivated(true);
        user.setUserStatus(UserStatusEnum.ACTIVE);
        user.setRole(RoleEnum.PROJECT_OWNER);
        user.setOrganizationId(GlobalUtils.stringToObjectId(OrganizationFactory.TEST_ORGANIZATION_ID));

        return user;
    }

    public static UserDto createUserDto(String number) {
        UserDto userDto = new UserDto();

        userDto.setId(TEST_USER_ID + number);
        userDto.setFirstName("userFirstName" + number);
        userDto.setLastName("userLastName" + number);
        userDto.setEmail("user" + number + "@email.com");
        userDto.setRole(RoleEnum.PROJECT_OWNER);

        return userDto;
    }
}
