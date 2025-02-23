package com.simpledpgfapi.dpgf.model.product.dto;

import com.simpledpgfapi.global.model.UnitEnum;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ProductCreationDto {
    @NotNull(message = "This field cannot be empty")
    private String name;
    @NotNull(message = "This field cannot be empty")
    private UnitEnum unit;
    @NotNull(message = "This field cannot be empty")
    private double unitPrice = 0.;
    @NotNull(message = "This field cannot be empty")
    private double quantity;
}
