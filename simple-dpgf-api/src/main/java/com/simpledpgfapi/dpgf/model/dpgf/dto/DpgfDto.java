package com.simpledpgfapi.dpgf.model.dpgf.dto;

import com.simpledpgfapi.dpgf.model.dpgf.DpgfStatusEnum;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.Instant;

@Data
public class DpgfDto {

    @NotNull
    private String id;
    private String name;
    private DpgfStatusEnum dpgfStatus = DpgfStatusEnum.IN_PROGRESS;
    private String createdByUser;
    private Instant lastModifiedDate;
    private double dpgfTotal;
}
