package com.simpledpgfapi.user.model.organization.dto;

import com.simpledpgfapi.global.exceptions.CodeErrorConstant;
import com.simpledpgfapi.user.model.organization.OrganizationTypeEnum;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class OrganizationCreationDto {
    @NotNull
    @Size(max = 250, message = CodeErrorConstant.NAME_FIELD_TOO_LONG)
    private String name;
    @NotNull
    private OrganizationTypeEnum organizationType;
}
