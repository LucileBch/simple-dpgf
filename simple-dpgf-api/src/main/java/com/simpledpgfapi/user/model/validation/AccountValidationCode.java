package com.simpledpgfapi.user.model.validation;

import com.simpledpgfapi.global.model.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import java.time.Instant;

@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class AccountValidationCode extends BaseEntity {
    public static final String CODE = "activationCode";

    @Id
    private ObjectId id;
    private String activationCode;
    private Instant expiration;
    private ObjectId userId;
}
