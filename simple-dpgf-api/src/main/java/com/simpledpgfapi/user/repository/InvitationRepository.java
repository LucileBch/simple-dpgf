package com.simpledpgfapi.user.repository;

import com.simpledpgfapi.user.model.invitation.Invitation;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InvitationRepository extends MongoRepository<Invitation, ObjectId> {
    Optional<Invitation> findByInvitationToken(String invitationToken);

    List<Invitation> findByOrganizationId(ObjectId organizationId);

    void deleteByEmailReceiver(String emailReceiver);

    Invitation findByEmailReceiver(String emailReceiver);
}
