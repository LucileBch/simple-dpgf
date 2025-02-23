package com.simpledpgfapi.dpgf.mapper;

import com.simpledpgfapi.dpgf.model.dpgf.Dpgf;
import com.simpledpgfapi.dpgf.model.dpgf.dto.DpgfCreationDto;
import com.simpledpgfapi.dpgf.model.dpgf.dto.DpgfDto;
import com.simpledpgfapi.global.mapper.ObjectIdMapper;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring",
        injectionStrategy = InjectionStrategy.CONSTRUCTOR,
        uses = {ObjectIdMapper.class}
        )
public interface DpgfMapper {
    Dpgf creationDtoToModel(DpgfCreationDto dpgfCreationDto);

    DpgfDto modelToDto(Dpgf dpgf);

    List<DpgfDto> modelsToDtos(List<Dpgf> dpgfList);
}
