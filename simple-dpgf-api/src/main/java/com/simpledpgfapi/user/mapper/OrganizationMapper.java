package com.simpledpgfapi.user.mapper;

import com.simpledpgfapi.global.mapper.ObjectIdMapper;
import com.simpledpgfapi.user.model.organization.Organization;
import com.simpledpgfapi.user.model.organization.dto.OrganizationCreationDto;
import com.simpledpgfapi.user.model.organization.dto.OrganizationDto;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring",
        injectionStrategy = InjectionStrategy.CONSTRUCTOR,
        uses = ObjectIdMapper.class)
public interface OrganizationMapper {
    Organization creationDtoToModel(OrganizationCreationDto organizationCreationDto);

    OrganizationDto modelToDto(Organization organization);
}
