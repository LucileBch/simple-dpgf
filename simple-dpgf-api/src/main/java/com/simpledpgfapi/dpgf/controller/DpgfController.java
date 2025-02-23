package com.simpledpgfapi.dpgf.controller;

import com.simpledpgfapi.dpgf.model.dpgf.DpgfStatusEnum;
import com.simpledpgfapi.dpgf.model.dpgf.dto.DpgfCreationDto;
import com.simpledpgfapi.dpgf.model.dpgf.dto.DpgfDto;
import com.simpledpgfapi.dpgf.model.lot.LotEnum;
import com.simpledpgfapi.dpgf.model.lot.dto.LotDto;
import com.simpledpgfapi.dpgf.model.product.dto.ProductCreationDto;
import com.simpledpgfapi.dpgf.model.product.dto.ProductDto;
import com.simpledpgfapi.dpgf.service.DpgfService;
import com.simpledpgfapi.dpgf.service.LotService;
import com.simpledpgfapi.dpgf.service.ProductService;
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
    @Autowired
    private LotService lotService;
    @Autowired
    private ProductService productService;

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

    @PreAuthorize("hasAnyRole( 'ROLE_ORGANIZATION_MANAGER')")
    @GetMapping("/{organizationId}/list")
    @ResponseStatus(value = HttpStatus.OK)
    public List<DpgfDto> getAllDpgfByOrganizationId(@PathVariable ObjectId organizationId) {
        return dpgfService.getDpgfListByOrganizationId(organizationId);
    }

    @PreAuthorize("hasAnyRole('ROLE_PROJECT_OWNER', 'ROLE_ORGANIZATION_MANAGER')")
    @GetMapping("/{dpgfId}")
    @ResponseStatus(value = HttpStatus.OK)
    public DpgfDto getDpgf(@PathVariable ObjectId dpgfId) {
        return dpgfService.getDpgfById(dpgfId);
    }

    @PreAuthorize("hasAnyRole('ROLE_PROJECT_OWNER')")
    @PutMapping("/{dpgfId}")
    @ResponseStatus(value = HttpStatus.OK)
    public void updateDpgfStatus(@PathVariable ObjectId dpgfId, @RequestParam DpgfStatusEnum dpgfStatus) {
        dpgfService.updateDpgfStatusById(dpgfId, dpgfStatus);
    }

    @PreAuthorize("hasAnyRole('ROLE_PROJECT_OWNER')")
    @DeleteMapping("/{dpgfId}")
    @ResponseStatus(value = HttpStatus.OK)
    public void deleteDpgf(@PathVariable ObjectId dpgfId) {
       dpgfService.deleteDpgfById(dpgfId);
    }

    @PreAuthorize("hasAnyRole('ROLE_PROJECT_OWNER')")
    @PostMapping("/{dpgfId}/lot")
    @ResponseStatus(value = HttpStatus.OK)
    public LotDto createLotForDpgf(@PathVariable ObjectId dpgfId, @RequestParam LotEnum lotName) {
        return lotService.createLot(dpgfId, lotName);
    }

    @PreAuthorize("hasAnyRole('ROLE_PROJECT_OWNER')")
    @DeleteMapping("/{dpgfId}/lot/{lotId}")
    @ResponseStatus(value = HttpStatus.OK)
    public void deleteLotById(@PathVariable ObjectId dpgfId, @PathVariable ObjectId lotId) {
        lotService.deleteLotAndAssociatedProducts(dpgfId, lotId);
    }

    @PreAuthorize("hasAnyRole('ROLE_PROJECT_OWNER', 'ROLE_ORGANIZATION_MANAGER')")
    @GetMapping("/{dpgfId}/lot-list")
    @ResponseStatus(value = HttpStatus.OK)
    public List<LotDto> getAllLotByDpgfId(@PathVariable ObjectId dpgfId) {
        return lotService.getAllLot(dpgfId);
    }

    @PreAuthorize("hasAnyRole('ROLE_PROJECT_OWNER')")
    @PostMapping("/{dpgfId}/lot/{lotId}/product")
    @ResponseStatus(value = HttpStatus.OK)
    public ProductDto createProduct(@PathVariable ObjectId dpgfId, @PathVariable ObjectId lotId,
                                    @Valid @RequestBody ProductCreationDto productCreationDto) {
        return productService.createProductForDpgf(dpgfId, lotId, productCreationDto);
    }

    @PreAuthorize("hasAnyRole('ROLE_PROJECT_OWNER', 'ROLE_ORGANIZATION_MANAGER')")
    @GetMapping("/{dpgfId}/product-list")
    @ResponseStatus(value = HttpStatus.OK)
    public List<ProductDto> getAllProductByDpgfId(@PathVariable ObjectId dpgfId) {
        return productService.getAllProducts(dpgfId);
    }

    @PreAuthorize("hasAnyRole('ROLE_PROJECT_OWNER')")
    @PutMapping("/{dpgfId}/product/{productId}")
    @ResponseStatus(value = HttpStatus.OK)
    public ProductDto updateProduct(@PathVariable ObjectId dpgfId,@PathVariable ObjectId productId, @Valid @RequestBody ProductCreationDto productCreationDto) {
        return productService.updateProductById(dpgfId, productId, productCreationDto);
    }

    @PreAuthorize("hasAnyRole('ROLE_PROJECT_OWNER')")
    @DeleteMapping("/{dpgfId}/product/{productId}")
    @ResponseStatus(value = HttpStatus.OK)
    public void deleteProduct(@PathVariable ObjectId dpgfId, @PathVariable ObjectId productId) {
        productService.deleteProductById(dpgfId, productId);
    }
}
