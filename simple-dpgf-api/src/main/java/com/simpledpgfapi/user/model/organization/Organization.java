package com.simpledpgfapi.user.model.organization;

import com.simpledpgfapi.global.model.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class Organization extends BaseEntity {
    public static final String ORGANIZATION_ID = "_id";
    public static final String USER_LICENSE_COUNTER = "memberLicenseCounter";
    public static final String PROJECT_LICENSE_COUNTER = "projectLicenseCounter";
    public static final String NAME = "name";
    public static final String ORGANIZATION_STATUS = "organizationStatus";
    public static final String ORGANIZATION_TYPE = "organizationType";

    @Id
    private ObjectId id;
    private String name;
    private OrganizationTypeEnum organizationType;
    private OrganizationStatusEnum organizationStatus;
    private Double memberLicenseCounter;
    private Double maxMemberLicenseCounter;
    private Double projectLicenseCounter;
    private Double maxProjectLicenseCounter;

    public Organization() {
    }
}
