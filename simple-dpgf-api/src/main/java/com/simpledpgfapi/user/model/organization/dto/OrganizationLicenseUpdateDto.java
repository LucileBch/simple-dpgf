package com.simpledpgfapi.user.model.organization.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class OrganizationLicenseUpdateDto {
    @NotNull(message = "Le champ ne peut pas être nul")
    @Min(value = 0, message = "La valeur ne peut pas être inférieure à 0")
    private Double memberLicenseCounter;
    @NotNull(message = "Le champ ne peut pas être nul")
    @Min(value = 0, message = "La valeur ne peut pas être inférieure à 0")
    private Double maxMemberLicenseCounter;
    @NotNull(message = "Le champ ne peut pas être nul")
    @Min(value = 0, message = "La valeur ne peut pas être inférieure à 0")
    private Double projectLicenseCounter;
    @NotNull(message = "Le champ ne peut pas être nul")
    @Min(value = 0, message = "La valeur ne peut pas être inférieure à 0")
    private Double maxProjectLicenseCounter;
}
