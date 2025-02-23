package com.simpledpgfapi.dpgf.service;

import com.simpledpgfapi.dpgf.exceptions.DpgfErrorCodes;
import com.simpledpgfapi.dpgf.mapper.ProductMapper;
import com.simpledpgfapi.dpgf.model.dpgf.Dpgf;
import com.simpledpgfapi.dpgf.model.lot.Lot;
import com.simpledpgfapi.dpgf.model.product.Product;
import com.simpledpgfapi.dpgf.model.product.dto.ProductCreationDto;
import com.simpledpgfapi.dpgf.model.product.dto.ProductDto;
import com.simpledpgfapi.dpgf.repository.DpgfRepository;
import com.simpledpgfapi.dpgf.repository.LotRepository;
import com.simpledpgfapi.dpgf.repository.ProductRepository;
import com.simpledpgfapi.global.exceptions.HttpException;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

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
    @Autowired
    private DpgfRepository dpgfRepository;

    @Transactional
    public ProductDto createProductForDpgf(ObjectId dpgfId, ObjectId lotId, ProductCreationDto productCreationDto) {
        Dpgf currentDpgf = dpgfRepository.findById(dpgfId)
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, DpgfErrorCodes.DPGF_NOT_FOUND));
        dpgfService.throwIfDpgfStatusNotValidForCreateOrUpdate(currentDpgf);

        Lot currentLot = lotRepository.findById(lotId)
                .orElseThrow(() ->  new HttpException(HttpStatus.BAD_REQUEST, DpgfErrorCodes.LOT_NOT_FOUND));

        Product newProduct = productMapper.creationDtoToModelWithCalculation(productCreationDto);
        newProduct.setLotCode(currentLot.getCode());
        newProduct.setLotId(lotId);
        newProduct.setDpgfId(dpgfId);
        productRepository.save(newProduct);

        dpgfService.addNewProductToDpgfTotal(currentDpgf, newProduct);

        return productMapper.modelToDto(newProduct);
    }

    public List<ProductDto> getAllProducts(ObjectId dpgfId) {
        dpgfService.throwIfDpgfStatusNotValidForDisplay(dpgfId);

        List<Product> productList = productRepository.findByDpgfId(dpgfId);
        return productMapper.modelsToDtos(productList);
    }

    @Transactional
    public ProductDto updateProductById(ObjectId dpgfId, ObjectId productId, ProductCreationDto productCreationDto) {
        Dpgf currentDpgf = dpgfRepository.findById(dpgfId)
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, DpgfErrorCodes.DPGF_NOT_FOUND));
        dpgfService.throwIfDpgfStatusNotValidForCreateOrUpdate(currentDpgf);

        Product productToUpdate = productRepository.findById(productId)
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, DpgfErrorCodes.PRODUCT_NOT_FOUND));
        double oldProductPrice = productToUpdate.getTotalPrice();

        if(!Objects.equals(productCreationDto.getName(), productToUpdate.getName())) {
            productToUpdate.setName(productCreationDto.getName());
        }
        if(!Objects.equals(productCreationDto.getQuantity(), productToUpdate.getQuantity())) {
            productToUpdate.setQuantity(productCreationDto.getQuantity());

        }
        if(!Objects.equals(productCreationDto.getUnitPrice(), productToUpdate.getUnitPrice())) {
            productToUpdate.setUnitPrice(productCreationDto.getUnitPrice());
        }
        productRepository.save(productToUpdate);
        
        recalculateProductPrice(productToUpdate);

        dpgfService.updateProductPriceInDpgfTotal(currentDpgf, oldProductPrice, productToUpdate);
        
        return productMapper.modelToDto(productToUpdate);
    }

    @Transactional
    public void deleteProductById(ObjectId dpgfId, ObjectId productId) {
        Dpgf currentDpgf = dpgfRepository.findById(dpgfId)
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, DpgfErrorCodes.DPGF_NOT_FOUND));

        dpgfService.throwIfDpgfStatusNotValidForCreateOrUpdate(currentDpgf);

        Product productToDelete = productRepository.findById(productId)
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, DpgfErrorCodes.PRODUCT_NOT_FOUND));

        dpgfService.deleteProductFromDpgfTotal(currentDpgf, productToDelete);

        productRepository.delete(productToDelete);
    }

    // utils
    private void recalculateProductPrice(Product product) {
        double productNewTotalPrice = product.getQuantity() * product.getUnitPrice();
        product.setTotalPrice(productNewTotalPrice);

        productRepository.save(product);
    }
}
