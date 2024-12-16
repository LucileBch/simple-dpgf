package com.simpledpgfapi.user.service;

import com.simpledpgfapi.global.exceptions.HttpException;
import com.simpledpgfapi.user.exceptions.OrganizationErrorCodes;
import com.simpledpgfapi.user.model.organization.Organization;
import com.simpledpgfapi.user.model.user.User;
import com.simpledpgfapi.user.repository.OrganizationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class OrganizationService {

    @Autowired
    private OrganizationRepository organizationRepository;


    public Organization findByUserId(User user) {
        return organizationRepository.findById(user.getOrganizationId())
                .orElseThrow(()-> new HttpException(
                        HttpStatus.BAD_REQUEST,
                        OrganizationErrorCodes.ORGANIZATION_NOT_FOUND)
                );
    }
}
