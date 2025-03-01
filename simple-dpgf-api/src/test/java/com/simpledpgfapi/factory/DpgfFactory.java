package com.simpledpgfapi.factory;

import com.simpledpgfapi.dpgf.model.dpgf.Dpgf;
import com.simpledpgfapi.dpgf.model.dpgf.DpgfStatusEnum;
import com.simpledpgfapi.dpgf.model.dpgf.dto.DpgfCreationDto;
import com.simpledpgfapi.dpgf.model.dpgf.dto.DpgfDto;
import com.simpledpgfapi.global.service.GlobalUtils;

public class DpgfFactory {
    // don't forget to add number
    public static final String TEST_DPGF_ID = "636d03893414c35ca6a904d";

    public static Dpgf createDpgf(String number) {
        Dpgf dpgf = new Dpgf();

        dpgf.setId(GlobalUtils.stringToObjectId(TEST_DPGF_ID + number));
        dpgf.setOrganizationId(GlobalUtils.stringToObjectId(OrganizationFactory.TEST_ORGANIZATION_ID));
        dpgf.setName("name" + number);
        dpgf.setUserId(GlobalUtils.stringToObjectId(UserFactory.TEST_USER_ID + number));
        dpgf.setDpgfStatus(DpgfStatusEnum.IN_PROGRESS);
        dpgf.setDpgfTotal(100);

        return dpgf;
    }

    public static DpgfCreationDto dpgfCreationDto(String number) {
        DpgfCreationDto dpgfCreationDto = new DpgfCreationDto();

        dpgfCreationDto.setName("name" + number);

        return dpgfCreationDto;
    }

    public static DpgfDto createDpgfDto(String number) {
        DpgfDto dpgfDto = new DpgfDto();

        dpgfDto.setId(TEST_DPGF_ID + number);
        dpgfDto.setName("name" + number);
        dpgfDto.setDpgfStatus(DpgfStatusEnum.IN_PROGRESS);
        dpgfDto.setDpgfTotal(100);

        return dpgfDto;
    }
}
