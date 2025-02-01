package com.simpledpgfapi.user.model.organization;

import com.simpledpgfapi.global.model.BaseEntity;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@Builder
public class Organization extends BaseEntity {

    @Id
    private ObjectId id;
    private String name;
    private OrganizationTypeEnum organizationType;
    private Double memberLicenseCounter;
    private Double maxMemberLicenseCounter;
    private Double projectLicenseCounter;
    private Double maxProjectLicenseCounter;
}
