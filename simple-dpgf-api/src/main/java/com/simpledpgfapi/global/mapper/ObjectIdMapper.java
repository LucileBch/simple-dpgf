package com.simpledpgfapi.global.mapper;

import com.simpledpgfapi.global.service.GlobalUtils;
import org.bson.types.ObjectId;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface ObjectIdMapper {

    default String objectIdToString(ObjectId dto) {
        return GlobalUtils.objectIdToString(dto);
    }

    default ObjectId stringToObjectId(String dto) {
        return GlobalUtils.stringToObjectId(dto);
    }
}
