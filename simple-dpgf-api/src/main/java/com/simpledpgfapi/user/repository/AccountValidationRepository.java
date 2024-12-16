package com.simpledpgfapi.user.repository;

import com.simpledpgfapi.user.model.validation.AccountValidation;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountValidationRepository extends MongoRepository<AccountValidation, ObjectId> {

    Optional<AccountValidation> findByActivationCode(String code);

}
