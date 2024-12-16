package com.simpledpgfapi.dpgf.model.dpgf.dto;

import com.simpledpgfapi.global.exceptions.CodeErrorConstant;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class DpgfCreationDto {

    @NotNull
    @Size(max = 250, message = CodeErrorConstant.NAME_FIELD_TOO_LONG)
    private String name;

}
