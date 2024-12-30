package com.simpledpgfapi.user.model.role;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

@Data
public class Role {

    @Id
    private ObjectId id;
    private RoleEnum roleName;
}
