package com.simpledpgfapi.dpgf.model.lot.dto;

import com.simpledpgfapi.dpgf.model.lot.LotEnum;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LotDto {
    @NotNull
    private String id;
    @NotNull
    private String dpgfId;
    @NotNull
    private LotEnum lotName;
    @NotNull
    private Integer code;
}
