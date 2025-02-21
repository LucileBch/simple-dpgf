package com.simpledpgfapi.dpgf.mapper;

import com.simpledpgfapi.dpgf.model.lot.Lot;
import com.simpledpgfapi.dpgf.model.lot.dto.LotDto;
import com.simpledpgfapi.global.mapper.ObjectIdMapper;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring",
        injectionStrategy = InjectionStrategy.CONSTRUCTOR,
        uses = {ObjectIdMapper.class})
public interface LotMapper {
    LotDto modelToDto(Lot lot);

    List<LotDto> modelsToDtos(List<Lot> lotList);
}
