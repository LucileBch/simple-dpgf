package com.simpledpgfapi.user.repository;

import com.simpledpgfapi.user.model.validation.AccountValidationCode;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountValidationCodeRepository extends MongoRepository<AccountValidationCode, ObjectId> {
    Optional<AccountValidationCode> findByActivationCode(String code);
}
