package com.simpledpgfapi.user.model.user;

import com.simpledpgfapi.global.model.BaseEntity;
import com.simpledpgfapi.user.model.role.RoleEnum;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@Builder
public class User extends BaseEntity implements UserDetails {
    public static final String ORGANIZATION_ID="organizationId";

    @Id
    private ObjectId id;

    private String firstName;
    private String lastName;
    private String email;
    
    private String password;
    private boolean isAccountActivated;
    private ObjectId organizationId;
    private UserStatusEnum userStatus;
    private RoleEnum role;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return role.getAuthorities();
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
