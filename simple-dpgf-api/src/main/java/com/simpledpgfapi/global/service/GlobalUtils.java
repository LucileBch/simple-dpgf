package com.simpledpgfapi.global.service;

import com.mongodb.lang.Nullable;
import com.simpledpgfapi.global.exceptions.GenericCodes;
import com.simpledpgfapi.global.exceptions.HttpException;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;

public class GlobalUtils {

    /**
     * Transform a string representation into an ObjectId instance
     *
     * @param dto the string to transform
     * @return the corresponding ObjectId or null
     * @throws HttpException if the string is not a valid ObjectId format
     */
    public static @Nullable ObjectId stringToObjectId(String dto) {
        if (dto == null || dto.isEmpty()) {
            return null;
        }
        try {
            return new ObjectId(dto);
        } catch (IllegalArgumentException e) {
            throw new HttpException(
                    HttpStatus.BAD_REQUEST,
                    GenericCodes.INCORRECT_OBJECTID
            );
        }
    }

    /**
     * Transform an ObjectId instance into a string representation
     *
     * @param objectId to transform
     * @return the corresponding string or null
     */
    public static String objectIdToString(ObjectId objectId) {
        if (objectId == null) {
            return null;
        }
        return objectId.toHexString();
    }
}
