package com.simpledpgfapi.user.repository;

import com.simpledpgfapi.user.model.refreshtoken.RefreshToken;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends MongoRepository<RefreshToken, ObjectId> {
    Optional<RefreshToken> findByToken(String token);

}
