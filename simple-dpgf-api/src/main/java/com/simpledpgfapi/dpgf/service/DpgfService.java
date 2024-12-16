package com.simpledpgfapi.dpgf.service;

import com.simpledpgfapi.dpgf.mapper.DpgfMapper;
import com.simpledpgfapi.dpgf.model.dpgf.Dpgf;
import com.simpledpgfapi.dpgf.model.dpgf.dto.DpgfCreationDto;
import com.simpledpgfapi.dpgf.model.dpgf.dto.DpgfDto;
import com.simpledpgfapi.dpgf.repository.DpgfRepository;
import com.simpledpgfapi.user.model.organization.Organization;
import com.simpledpgfapi.user.model.user.User;
import com.simpledpgfapi.user.repository.UserRepository;
import com.simpledpgfapi.user.service.OrganizationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class DpgfService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OrganizationService organizationService;
    @Autowired
    private DpgfMapper dpgfMapper;
    @Autowired
    private DpgfRepository dpgfRepository;

    //@Transactional
    public DpgfDto createDpgf(DpgfCreationDto dpgfCreationDto) {
        //TODO:  user check rights
        // recup user et voir si OK TODO : mettre ça dans un service global
        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        // GERER ERREUR mais probablement dans le Authenticatino SERvice
        User currentUser = userRepository.findByEmail(currentUserEmail).orElseThrow();


        // organizaion.findByUser
        Organization organization = organizationService.findByUserId(currentUser);

        // transform in model
        Dpgf newDpgf = dpgfMapper.creationDtoToModel(dpgfCreationDto);
        newDpgf.setOrganizationId(organization.getId());
        newDpgf.setUserId(currentUser.getId());
        dpgfRepository.insert(newDpgf);

        return dpgfMapper.modelToDto(newDpgf);
    }
}
