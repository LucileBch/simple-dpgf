package com.simpledpgfapi.user.model.role;

import com.simpledpgfapi.user.model.privilege.PrivilegeEnum;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public enum RoleEnum {
    ADMIN(
            Set.of(PrivilegeEnum.READ_PRIVILEGE,
                    PrivilegeEnum.WRITE_PRIVILEGE,
                    PrivilegeEnum.UPDATE_PRIVILEGE,
                    PrivilegeEnum.DELETE_PRIVILEGE)
    ),
    ORGANIZATION_MANAGER(
            Set.of(PrivilegeEnum.READ_PRIVILEGE,
                    PrivilegeEnum.WRITE_PRIVILEGE,
                    PrivilegeEnum.UPDATE_PRIVILEGE,
                    PrivilegeEnum.DELETE_PRIVILEGE)
    ),
    PROJECT_OWNER(
            Set.of(
                    PrivilegeEnum.READ_PRIVILEGE,
                    PrivilegeEnum.WRITE_PRIVILEGE,
                    PrivilegeEnum.UPDATE_PRIVILEGE,
                    PrivilegeEnum.DELETE_PRIVILEGE)
    ),
    DISABLED(Set.of());

    @Getter
    private final Set<PrivilegeEnum> privileges;

    public List<SimpleGrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> authorities = getPrivileges()
                .stream()
                .map(privilege -> new SimpleGrantedAuthority(privilege.name()))
                .collect(Collectors.toList());

        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return authorities;
    }
}
