package com.simpledpgfapi.dpgf.model.product.dto;

import com.simpledpgfapi.global.model.UnitEnum;
import lombok.Data;

@Data
public class ProductDto {
    private String id;
    private String dpgfId;
    private String lotId;
    private int lotCode;

    private String name;
    private UnitEnum unit;
    private double unitPrice = 0.;
    private double quantity;
    private double totalPrice = 0.;
}
