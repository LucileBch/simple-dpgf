package com.simpledpgfapi.user.mapper;

import com.simpledpgfapi.global.mapper.ObjectIdMapper;
import com.simpledpgfapi.user.model.invitation.Invitation;
import com.simpledpgfapi.user.model.invitation.dto.InvitationDto;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring",
        injectionStrategy = InjectionStrategy.CONSTRUCTOR,
        uses = {ObjectIdMapper .class})
public interface InvitationMapper {

    @Mapping(source = "invitation.id", target = "id")
    @Mapping(source = "invitation.firstName", target = "firstName")
    @Mapping(source = "invitation.lastName", target = "lastName")
    @Mapping(source = "invitation.emailReceiver", target = "emailReceiver")
    @Mapping(source = "invitation.invitationStatus", target = "invitationStatus")
    InvitationDto modelToDto(Invitation invitation);
}
