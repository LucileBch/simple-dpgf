package com.simpledpgfapi.user.repository.organizationrepository;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Repository;

@Repository
public interface OrganizationRepositoryCustom {
    void incrementUserLicenseCounter(ObjectId organizationId);

    void decrementUserLicenseCounter(ObjectId organizationId);

    void incrementProjectLicenseCounter(ObjectId organizationId);

    void decrementProjectLicenseCounter(ObjectId organizationId);
}
