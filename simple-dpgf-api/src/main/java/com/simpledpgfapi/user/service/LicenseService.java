package com.simpledpgfapi.user.service;

import com.simpledpgfapi.global.exceptions.HttpException;
import com.simpledpgfapi.user.exceptions.OrganizationErrorCodes;
import com.simpledpgfapi.user.model.organization.Organization;
import com.simpledpgfapi.user.model.user.User;
import com.simpledpgfapi.user.repository.organizationrepository.OrganizationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class LicenseService {
    @Autowired
    private OrganizationRepository organizationRepository;

    public void incrementUserLicenseCounter(User user) {
        Organization currentOrganization = organizationRepository.findById(user.getOrganizationId())
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, OrganizationErrorCodes.ORGANIZATION_NOT_FOUND));

        boolean isRemainingUserLicense = checkRemainingUserLicenseCounter(currentOrganization);
        if(isRemainingUserLicense) {
            organizationRepository.incrementUserLicenseCounter(currentOrganization.getId());
        } else {
            throw new HttpException(HttpStatus.BAD_REQUEST, OrganizationErrorCodes.NO_MORE_USER_LICENSE);
        }
    }

    public void releaseUserLicenseCounter(User user) {
        Organization currentOrganization = organizationRepository.findById(user.getOrganizationId())
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, OrganizationErrorCodes.ORGANIZATION_NOT_FOUND));

        organizationRepository.decrementUserLicenseCounter(currentOrganization.getId());
    }

    public void incrementProjectLicenseCounter(User user) {
        Organization currentOrganization = organizationRepository.findById(user.getOrganizationId())
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, OrganizationErrorCodes.ORGANIZATION_NOT_FOUND));

        boolean isRemainingProjectLicense = checkRemainingProjectLicenseCounter(currentOrganization);
        if(isRemainingProjectLicense) {
            organizationRepository.incrementProjectLicenseCounter(currentOrganization.getId());
        } else {
            throw new HttpException(HttpStatus.BAD_REQUEST, OrganizationErrorCodes.NO_MORE_PROJECT_LICENSE);
        }
    }

    public void releaseProjectLicenseCounter(User user) {
        Organization currentOrganization = organizationRepository.findById(user.getOrganizationId())
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, OrganizationErrorCodes.ORGANIZATION_NOT_FOUND));

        organizationRepository.decrementProjectLicenseCounter(currentOrganization.getId());
    }

    // utils
    public boolean checkRemainingUserLicenseCounter(Organization organization) {
        return organization.getMemberLicenseCounter() < organization.getMaxMemberLicenseCounter();
    }

    public boolean checkRemainingProjectLicenseCounter(Organization organization) {
        return organization.getProjectLicenseCounter() < organization.getMaxProjectLicenseCounter();
    }
}
