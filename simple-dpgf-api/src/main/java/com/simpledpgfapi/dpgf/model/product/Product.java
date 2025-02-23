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
    private ObjectId dpgfId;
    @NotNull
    private ObjectId lotId;
    private int lotCode;
    @NotNull
    private String name;

    private UnitEnum unit;
    private double unitPrice = 0.;
    private double quantity;
    private double totalPrice = 0.;


    public void calculatePrices() {
        this.totalPrice = this.unitPrice * this.quantity;
    }
}
