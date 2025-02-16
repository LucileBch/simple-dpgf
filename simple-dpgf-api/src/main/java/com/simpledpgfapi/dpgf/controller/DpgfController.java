package com.simpledpgfapi.dpgf.controller;

import com.simpledpgfapi.dpgf.model.dpgf.DpgfStatusEnum;
import com.simpledpgfapi.dpgf.model.dpgf.dto.DpgfCreationDto;
import com.simpledpgfapi.dpgf.model.dpgf.dto.DpgfDto;
import com.simpledpgfapi.dpgf.service.DpgfService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value="dpgf")
public class DpgfController {
    @Autowired
    private DpgfService dpgfService;

    @PreAuthorize("hasAnyRole('ROLE_PROJECT_OWNER', 'ROLE_ORGANIZATION_MANAGER')")
    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public DpgfDto createDpgf(@Valid @RequestBody DpgfCreationDto dpgfCreationDto) {
        return dpgfService.createDpgf(dpgfCreationDto);
    }

    @PreAuthorize("hasAnyRole('ROLE_PROJECT_OWNER', 'ROLE_ORGANIZATION_MANAGER')")
    @GetMapping("/list")
    @ResponseStatus(value = HttpStatus.OK)
    public List<DpgfDto> getAllDpgf() {
        return dpgfService.getDpgfListByUserId();
    }

    @PreAuthorize("hasAnyRole('ROLE_PROJECT_OWNER', 'ROLE_ORGANIZATION_MANAGER')")
    @PutMapping("/{dpgfId}")
    @ResponseStatus(value = HttpStatus.OK)
    public void updateDpgfStatus(@PathVariable ObjectId dpgfId, @RequestParam DpgfStatusEnum dpgfStatus) {
        dpgfService.updateDpgfStatusById(dpgfId, dpgfStatus);
    }

    @PreAuthorize("hasAnyRole('ROLE_PROJECT_OWNER', 'ROLE_ORGANIZATION_MANAGER')")
    @DeleteMapping("/{dpgfId}")
    @ResponseStatus(value = HttpStatus.OK)
    public void deleteDpgf(@PathVariable ObjectId dpgfId) {
       dpgfService.deleteDpgfById(dpgfId);
    }
}
