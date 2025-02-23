package com.simpledpgfapi.user.repository;

import com.simpledpgfapi.user.model.user.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, ObjectId> {
    Optional<User> findByEmail(String email);

    List<User> findByOrganizationId(ObjectId organizationId);
}
