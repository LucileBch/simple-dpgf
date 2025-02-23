package com.simpledpgfapi.dpgf.model.dpgf;

import com.simpledpgfapi.global.model.BaseEntity;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class Dpgf extends BaseEntity {
    public static final String USER_ID = "userId";
    public static final String ORGANIZATION_ID = "organizationId";
    public static final String DPGF_STATUS = "dpgfStatus";

    @Id
    private ObjectId id;
    @NotNull
    private String name;
    @NotNull
    private ObjectId organizationId;
    @NotNull
    private ObjectId userId;
    private DpgfStatusEnum dpgfStatus = DpgfStatusEnum.IN_PROGRESS;
    private double dpgfTotal = 0;

}
