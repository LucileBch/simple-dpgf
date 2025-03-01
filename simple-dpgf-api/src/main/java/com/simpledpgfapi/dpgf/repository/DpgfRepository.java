package com.simpledpgfapi.dpgf.repository;

import com.simpledpgfapi.dpgf.model.dpgf.Dpgf;
import com.simpledpgfapi.dpgf.model.dpgf.DpgfStatusEnum;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DpgfRepository extends MongoRepository<Dpgf, ObjectId> {
    List<Dpgf> findByUserIdAndDpgfStatusNot(ObjectId userId, DpgfStatusEnum dpgfStatus);

    List<Dpgf> findByOrganizationIdAndDpgfStatusNot(ObjectId organizationId, DpgfStatusEnum dpgfStatus);

    List<Dpgf> findByOrganizationId(ObjectId organizationId);

    List<Dpgf> findByUserId(ObjectId userId);
}
