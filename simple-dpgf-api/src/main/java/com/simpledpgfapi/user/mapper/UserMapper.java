package com.simpledpgfapi.user.mapper;

import com.simpledpgfapi.global.mapper.ObjectIdMapper;
import com.simpledpgfapi.user.model.organization.Organization;
import com.simpledpgfapi.user.model.user.User;
import com.simpledpgfapi.user.model.user.dto.*;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring",
        injectionStrategy = InjectionStrategy.CONSTRUCTOR,
        uses = {ObjectIdMapper.class,OrganizationMapper.class})
public interface UserMapper {
        User creationDtoToModel(UserCreationDto userCreationDto);

        @Mapping(source = "user.id", target = "id")
        @Mapping(source = "user.firstName", target = "firstName")
        @Mapping(source = "user.lastName", target = "lastName")
        @Mapping(source = "user.email", target = "email")
        @Mapping(source = "organization", target = "organization")
        @Mapping(source = "user.role", target = "role")
        UserDto modelToDto(User user, Organization organization);

        @Mapping(source = "organization", target = "organization", ignore = true)
        List<UserDto> modelsToDtos(List<User> userList);

        UserDetailsDto modelToUserDetailsDto(User user);

        @Mapping(source = "accessToken", target = "accessToken")
        @Mapping(source = "refreshToken", target = "refreshToken")
        UserTokenUpdateDto modelAndTokenToDto(User user, String accessToken, String refreshToken);

        UserCreationDto invitedToCreationDto(UserInvitedDto userInvitedDto);
}
