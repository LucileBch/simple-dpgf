package com.simpledpgfapi.dpgf.repository;

import com.simpledpgfapi.dpgf.model.lot.Lot;
import com.simpledpgfapi.dpgf.model.lot.LotEnum;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface LotRepository extends MongoRepository<Lot, ObjectId> {

    boolean existsByDpgfIdAndLotName(ObjectId dpgfId, LotEnum lotName);

    List<Lot> findByDpgfId(ObjectId dpgfId);

}
