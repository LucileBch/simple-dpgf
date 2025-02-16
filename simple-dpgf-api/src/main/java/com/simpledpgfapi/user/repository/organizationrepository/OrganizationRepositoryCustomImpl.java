package com.simpledpgfapi.user.repository.organizationrepository;

import com.simpledpgfapi.user.model.organization.Organization;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;


public class OrganizationRepositoryCustomImpl implements OrganizationRepositoryCustom{
    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public void incrementUserLicenseCounter(ObjectId organizationId) {
        Query query = new Query().addCriteria(Criteria.where(Organization.ID).is(organizationId));

        Update update = new Update().inc(Organization.USER_LICENSE_COUNTER, 1);

        mongoTemplate.findAndModify(query, update, Organization.class);
    }

    @Override
    public void decrementUserLicenseCounter(ObjectId organizationId) {
        Query query = new Query();
        query.addCriteria(Criteria.where(Organization.ID).is(organizationId));
        query.addCriteria(Criteria.where(Organization.USER_LICENSE_COUNTER).gt(0));

        Update update = new Update().inc(Organization.USER_LICENSE_COUNTER, -1);

        mongoTemplate.findAndModify(query, update, Organization.class);
    }

    @Override
    public void incrementProjectLicenseCounter(ObjectId organizationId) {
        Query query = new Query().addCriteria(Criteria.where(Organization.ID).is(organizationId));

        Update update = new Update().inc(Organization.PROJECT_LICENSE_COUNTER, 1);

        mongoTemplate.findAndModify(query, update, Organization.class);
    }

    @Override
    public void decrementProjectLicenseCounter(ObjectId organizationId) {
        Query query = new Query();
        query.addCriteria(Criteria.where(Organization.ID).is(organizationId));
        query.addCriteria(Criteria.where(Organization.PROJECT_LICENSE_COUNTER).gt(0));

        Update update = new Update().inc(Organization.PROJECT_LICENSE_COUNTER, -1);

        mongoTemplate.findAndModify(query, update, Organization.class);
    }
}
