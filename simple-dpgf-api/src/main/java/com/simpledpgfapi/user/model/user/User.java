package com.simpledpgfapi.user.model.user;

import com.simpledpgfapi.global.model.BaseEntity;
import com.simpledpgfapi.user.model.role.Role;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import java.util.Set;

@Data
// génère les annotations equals and hashcode en faisant appel aux parents aussi
@EqualsAndHashCode(callSuper = true)
// génère méthode tostring + appel aux parents
@ToString(callSuper = true)
public class User extends BaseEntity {
    public static final String ORGANIZATION_ID="organizationId";

    @Id
    private ObjectId id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private boolean isAccountActivated;
    private ObjectId organizationId;
    private Set<Role> roles;

}
