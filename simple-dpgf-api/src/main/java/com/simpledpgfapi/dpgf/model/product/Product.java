package com.simpledpgfapi.dpgf.model.product;

import com.simpledpgfapi.global.model.BaseEntity;
import com.simpledpgfapi.global.model.UnitEnum;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class Product extends BaseEntity {

    @Id
    private ObjectId id;
    @NotNull
    private ObjectId organizationId;
    @NotNull
    private ObjectId dpgfId;
    @NotNull
    private ObjectId lotId;
    @NotNull
    private String name;

    private UnitEnum unit;
    private double unitPrice = 0.;
    private double netPrice = 0.;
    private double grossPrice = 0.;
    private double taxPercentage = 20.;
    private double quantity;

    public void calculatePrices() {
        this.netPrice = this.unitPrice * this.quantity;
        this.grossPrice = this.unitPrice * (this.taxPercentage / 100 ) * this.quantity;
    }
}
