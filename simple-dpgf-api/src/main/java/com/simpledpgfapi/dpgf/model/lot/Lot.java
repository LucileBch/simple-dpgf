package com.simpledpgfapi.dpgf.model.lot;

import com.simpledpgfapi.dpgf.model.dpgf.DpgfStatusEnum;
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
public class Lot extends BaseEntity {
    public static final String DPGF_ID = "dpgfId";
    public static final String LOT_NAME = "lotName";
    public static final String DPGF_STATUS = "dpgfStatus";

    @Id
    private ObjectId id;
    @NotNull
    private ObjectId dpgfId;
    @NotNull
    private LotEnum lotName;
    @NotNull
    private Integer code;
    private DpgfStatusEnum dpgfStatus = DpgfStatusEnum.IN_PROGRESS;

    public void setLotName(LotEnum lotName) {
        this.lotName = lotName;
        this.code = lotName.getKey();
    }

    public Integer getCode() {
        return lotName != null ? lotName.getKey() : null;
    }
}
