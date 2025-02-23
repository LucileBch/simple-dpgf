package com.simpledpgfapi.dpgf.mapper;

import com.simpledpgfapi.dpgf.model.product.Product;
import com.simpledpgfapi.dpgf.model.product.dto.ProductCreationDto;
import com.simpledpgfapi.dpgf.model.product.dto.ProductDto;
import com.simpledpgfapi.global.mapper.ObjectIdMapper;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring",
        injectionStrategy = InjectionStrategy.CONSTRUCTOR,
        uses = {ObjectIdMapper.class})
public interface ProductMapper {
    Product creationDtoToModel(ProductCreationDto productCreationDto);

    default Product creationDtoToModelWithCalculation(ProductCreationDto productCreationDto) {
        Product product = creationDtoToModel(productCreationDto);
        product.calculatePrices();
        return product;
    }

    ProductDto modelToDto(Product product);

    List<ProductDto> modelsToDtos(List<Product> productList);
}
