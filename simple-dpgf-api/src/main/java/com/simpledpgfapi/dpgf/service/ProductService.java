package com.simpledpgfapi.dpgf.service;

import com.simpledpgfapi.dpgf.exceptions.DpgfErrorCodes;
import com.simpledpgfapi.dpgf.mapper.ProductMapper;
import com.simpledpgfapi.dpgf.model.lot.Lot;
import com.simpledpgfapi.dpgf.model.product.Product;
import com.simpledpgfapi.dpgf.model.product.dto.ProductCreationDto;
import com.simpledpgfapi.dpgf.model.product.dto.ProductDto;
import com.simpledpgfapi.dpgf.repository.LotRepository;
import com.simpledpgfapi.dpgf.repository.ProductRepository;
import com.simpledpgfapi.global.exceptions.HttpException;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class ProductService {
    @Autowired
    private DpgfService dpgfService;
    @Autowired
    private ProductMapper productMapper;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private LotRepository lotRepository;

    public ProductDto createProductForDpgf(ObjectId dpgfId, ObjectId lotId, ProductCreationDto productCreationDto) {
        dpgfService.throwIfDpgfStatusNotValidForCreateOrUpdate(dpgfId);

        Lot currentLot = lotRepository.findById(lotId)
                .orElseThrow(() ->  new HttpException(HttpStatus.BAD_REQUEST, DpgfErrorCodes.LOT_NOT_FOUND));

        Product newProduct = productMapper.creationDtoToModelWithCalculation(productCreationDto);
        newProduct.setLotCode(currentLot.getCode());
        newProduct.setLotId(lotId);
        newProduct.setDpgfId(dpgfId);
        productRepository.save(newProduct);

        return  productMapper.modelToDto(newProduct);
    }

    public List<ProductDto> getAllProducts(ObjectId dpgfId) {
        dpgfService.throwIfDpgfStatusNotValidForDisplay(dpgfId);

        List<Product> productList = productRepository.findByDpgfId(dpgfId);
        return productMapper.modelsToDtos(productList);
    }
}
