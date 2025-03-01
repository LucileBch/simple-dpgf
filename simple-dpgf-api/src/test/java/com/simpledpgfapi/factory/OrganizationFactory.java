package com.simpledpgfapi.factory;

import com.simpledpgfapi.global.service.GlobalUtils;
import com.simpledpgfapi.user.model.organization.Organization;
import com.simpledpgfapi.user.model.organization.OrganizationStatusEnum;
import com.simpledpgfapi.user.model.organization.OrganizationTypeEnum;
import com.simpledpgfapi.user.model.organization.dto.OrganizationDto;

public class OrganizationFactory {
    public static final String TEST_ORGANIZATION_ID = "636d03893414c35ca6a904c1";

    public static Organization createOrganization(String number) {
        Organization organization = new Organization();

        organization.setId(GlobalUtils.stringToObjectId(TEST_ORGANIZATION_ID));
        organization.setName("name" + number);
        organization.setOrganizationType(OrganizationTypeEnum.MOE);
        organization.setOrganizationStatus(OrganizationStatusEnum.ACTIVE);
        organization.setMemberLicenseCounter(5.);
        organization.setMaxMemberLicenseCounter(6.);
        organization.setProjectLicenseCounter(5.);
        organization.setMaxProjectLicenseCounter(6.);

        return organization;
    }

    public static OrganizationDto createOrganizationDto(String number) {
        OrganizationDto organizationDto = new OrganizationDto();

        organizationDto.setId(TEST_ORGANIZATION_ID);
        organizationDto.setName("name" + number);
        organizationDto.setOrganizationType(OrganizationTypeEnum.MOE);
        organizationDto.setMemberLicenseCounter(5.);
        organizationDto.setMaxMemberLicenseCounter(6.);
        organizationDto.setProjectLicenseCounter(5.);
        organizationDto.setMaxProjectLicenseCounter(6.);

        return organizationDto;
    }
}
