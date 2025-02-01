package com.simpledpgfapi.user.model.organization.dto;

import com.simpledpgfapi.user.model.organization.OrganizationTypeEnum;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class OrganizationDto {
    @NotNull
    private String id;
    @NotNull
    private String name;
    @NotNull
    private OrganizationTypeEnum organizationType;
    private Double memberLicenseCounter;
    private Double maxMemberLicenseCounter;
    private Double projectLicenseCounter;
    private Double maxProjectLicenseCounter;
}
