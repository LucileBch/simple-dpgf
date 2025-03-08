package com.simpledpgfapi.user.repository.organizationrepository;

import com.simpledpgfapi.user.model.organization.Organization;
import com.simpledpgfapi.user.model.organization.OrganizationStatusEnum;
import com.simpledpgfapi.user.model.organization.OrganizationTypeEnum;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrganizationRepository extends MongoRepository<Organization, ObjectId>, OrganizationRepositoryCustom {
    Organization findByName(String organizationName);

    List<Organization> findByOrganizationStatusNotAndOrganizationTypeNot(
            OrganizationStatusEnum status,
            OrganizationTypeEnum organizationType);
}
