package com.simpledpgfapi.user.repository;

import com.simpledpgfapi.user.model.invitation.Invitation;
import com.simpledpgfapi.user.model.invitation.InvitationStatusEnum;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InvitationRepository extends MongoRepository<Invitation, ObjectId> {
    Optional<Invitation> findByInvitationToken(String invitationToken);

    void deleteAllByEmail(String email);

    Optional<Invitation> findFirstByEmailAndInvitationStatusNot(String email, InvitationStatusEnum invitationStatus);
}
