package com.simpledpgfapi.unittests;

import com.simpledpgfapi.UTBase;
import com.simpledpgfapi.dpgf.mapper.DpgfMapper;
import com.simpledpgfapi.dpgf.model.dpgf.Dpgf;
import com.simpledpgfapi.dpgf.model.dpgf.dto.DpgfCreationDto;
import com.simpledpgfapi.dpgf.model.dpgf.dto.DpgfDto;
import com.simpledpgfapi.dpgf.repository.DpgfRepository;
import com.simpledpgfapi.dpgf.service.DpgfService;
import com.simpledpgfapi.factory.DpgfFactory;
import com.simpledpgfapi.factory.OrganizationFactory;
import com.simpledpgfapi.factory.UserFactory;
import com.simpledpgfapi.user.model.organization.Organization;
import com.simpledpgfapi.user.model.user.User;
import com.simpledpgfapi.user.repository.UserRepository;
import com.simpledpgfapi.user.repository.organizationrepository.OrganizationRepository;
import com.simpledpgfapi.user.service.LicenseService;
import org.assertj.core.api.BDDAssertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DpgfServiceTest extends UTBase {
    @Mock
    private UserRepository userRepository;
    @Mock
    private OrganizationRepository organizationRepository;
    @Mock
    private DpgfMapper dpgfMapper;
    @Mock
    private DpgfRepository dpgfRepository;
    @Mock
    private LicenseService licenseService;

    @InjectMocks
    private DpgfService dpgfService;

    @Test
    void testCreateDpgf() {
        // GIVEN
        User user = UserFactory.createUser("1");
        Organization organization = OrganizationFactory.createOrganization("1");
        Dpgf dpgf = DpgfFactory.createDpgf("1");
        DpgfDto expectedDpgfDto = DpgfFactory.createDpgfDto("1");
        DpgfCreationDto dpgfCreationDto = DpgfFactory.dpgfCreationDto("1");

        // mock behaviour
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));
        when(organizationRepository.findById(organization.getId())).thenReturn(Optional.of(organization));
        when(dpgfMapper.creationDtoToModel(dpgfCreationDto)).thenReturn(dpgf);
        when(dpgfMapper.modelToDto(dpgf)).thenReturn(expectedDpgfDto);

        // WHEN
        DpgfDto actualDpgfDto = dpgfService.createDpgf(dpgfCreationDto);
        
        // THEN
        expectedDpgfDto.setCreatedByUser(user.getFirstName() + " " + user.getLastName());
        
        BDDAssertions.then(actualDpgfDto).isNotNull();
        BDDAssertions.then(actualDpgfDto).isEqualTo(expectedDpgfDto);

        // check licenseService is called
        verify(licenseService, times(1)).incrementProjectLicenseCounter(user);
    }
}