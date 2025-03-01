package com.simpledpgfapi.dpgf.model.product.dto;

import com.simpledpgfapi.global.exceptions.CodeErrorConstant;
import com.simpledpgfapi.global.model.UnitEnum;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class ProductCreationDto {
    @NotNull(message = "This field cannot be empty")
    private String name;
    @NotNull(message = "This field cannot be empty")
    private UnitEnum unit;
    @Positive(message = CodeErrorConstant.MUST_BE_POSITIV_NUMBER)
    private double unitPrice;
    @Positive(message = CodeErrorConstant.MUST_BE_POSITIV_NUMBER)
    private double quantity;
}
