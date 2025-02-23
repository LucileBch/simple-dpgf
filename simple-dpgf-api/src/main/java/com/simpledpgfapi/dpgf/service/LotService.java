package com.simpledpgfapi.dpgf.service;

import com.simpledpgfapi.dpgf.exceptions.DpgfErrorCodes;
import com.simpledpgfapi.dpgf.mapper.LotMapper;
import com.simpledpgfapi.dpgf.mapper.ProductMapper;
import com.simpledpgfapi.dpgf.model.dpgf.Dpgf;
import com.simpledpgfapi.dpgf.model.lot.Lot;
import com.simpledpgfapi.dpgf.model.lot.LotEnum;
import com.simpledpgfapi.dpgf.model.lot.dto.LotDto;
import com.simpledpgfapi.dpgf.model.product.Product;
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

@Slf4j
@Service
public class LotService {
    @Autowired
    private LotMapper lotMapper;
    @Autowired
    private ProductMapper productMapper;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private DpgfService dpgfService;
    @Autowired
    private LotRepository lotRepository;
    @Autowired
    private DpgfRepository dpgfRepository;

    public LotDto createLot(ObjectId dpgfId, LotEnum lotName){
        Dpgf currentDpgf = dpgfRepository.findById(dpgfId)
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, DpgfErrorCodes.DPGF_NOT_FOUND));

        dpgfService.throwIfDpgfStatusNotValidForCreateOrUpdate(currentDpgf);

        boolean isLotExisting = lotRepository.existsByDpgfIdAndLotName(dpgfId, lotName);

        if(isLotExisting) {
            throw new HttpException(HttpStatus.BAD_REQUEST, DpgfErrorCodes.LOT_ALREADY_EXISTS);
        }

        Lot lotToCreate = new Lot();
        lotToCreate.setDpgfId(dpgfId);
        lotToCreate.setLotName(lotName);
        lotRepository.save(lotToCreate);

        return lotMapper.modelToDto(lotToCreate);
    }

    public List<LotDto> getAllLot(ObjectId dpgfId) {
        dpgfService.throwIfDpgfStatusNotValidForDisplay(dpgfId);

        List<Lot> lotList = lotRepository.findByDpgfId(dpgfId);
        return lotMapper.modelsToDtos(lotList);
    }

    @Transactional
    public void deleteLotAndAssociatedProducts(ObjectId dpgfId, ObjectId lotId) {
        Dpgf currentDpgf = dpgfRepository.findById(dpgfId)
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, DpgfErrorCodes.DPGF_NOT_FOUND));

        dpgfService.throwIfDpgfStatusNotValidForCreateOrUpdate(currentDpgf);

        Lot currentLot = lotRepository.findById(lotId)
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, DpgfErrorCodes.LOT_NOT_FOUND));

        List<Product> productList = productRepository.findByLotId(currentLot.getId());
        productList.forEach(product -> {
            dpgfService.deleteProductFromDpgfTotal(currentDpgf, product);
            productRepository.delete(product);
        });

        lotRepository.delete(currentLot);
    }
}
