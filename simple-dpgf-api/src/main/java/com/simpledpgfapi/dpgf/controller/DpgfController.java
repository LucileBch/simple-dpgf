package com.simpledpgfapi.dpgf.controller;

import com.simpledpgfapi.dpgf.model.dpgf.dto.DpgfCreationDto;
import com.simpledpgfapi.dpgf.model.dpgf.dto.DpgfDto;
import com.simpledpgfapi.dpgf.service.DpgfService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping(value="dpgf")
public class DpgfController {
    @Autowired
    private DpgfService dpgfService;

    @PreAuthorize("hasAnyRole('ROLE_PROJECT_OWNER', 'ROLE_ORGANIZATION_MANAGER')")
    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    @ApiResponses(value= {@ApiResponse(responseCode = "201", description = "Dpgf created")})
    public DpgfDto createDto(@Valid @RequestBody DpgfCreationDto dpgfCreationDto) {
        return dpgfService.createDpgf(dpgfCreationDto);
    }
}
