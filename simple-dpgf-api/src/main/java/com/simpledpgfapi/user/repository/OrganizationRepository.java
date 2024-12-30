package com.simpledpgfapi.user.repository;

import com.simpledpgfapi.user.model.organization.Organization;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrganizationRepository extends MongoRepository<Organization, ObjectId> {
    Organization findByName(String organizationName);
}
