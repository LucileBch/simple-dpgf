package com.simpledpgfapi.dpgf.repository;

import com.simpledpgfapi.dpgf.model.dpgf.Dpgf;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DpgfRepository extends MongoRepository<Dpgf, ObjectId> {
    double countByOrganizationId(ObjectId organizationId);
}
