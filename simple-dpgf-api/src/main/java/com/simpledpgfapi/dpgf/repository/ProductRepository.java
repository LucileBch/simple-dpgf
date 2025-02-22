package com.simpledpgfapi.dpgf.repository;

import com.simpledpgfapi.dpgf.model.product.Product;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ProductRepository extends MongoRepository<Product, ObjectId> {
    List<Product> findByDpgfId(ObjectId dpgfId);

    List<Product> findByLotId(ObjectId lotId);
}
