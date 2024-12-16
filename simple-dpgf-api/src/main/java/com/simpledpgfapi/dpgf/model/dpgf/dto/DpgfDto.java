package com.simpledpgfapi.dpgf.model.dpgf.dto;

import com.simpledpgfapi.dpgf.model.dpgf.DpgfVersionEnum;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class DpgfDto {

    @NotNull
    private String id;
    private String name;
    private int lotQuantity;
    private DpgfVersionEnum dpgfVersion;

}
