package com.simpledpgfapi.user.service;

import com.simpledpgfapi.user.model.user.User;
import com.simpledpgfapi.user.model.validation.AccountValidation;
import com.simpledpgfapi.user.repository.AccountValidationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Random;

@Service
public class AccountValidationService {
    @Autowired
    private AccountValidationRepository accountValidationRepository;
    @Autowired
    private EmailService emailService;

    public void confirmUserAccount(User user) {
        AccountValidation accountValidation = new AccountValidation();
        accountValidation.setUserId(user.getId());

        accountValidation.setCreatedDate(Instant.now());

        accountValidation.setExpiration(accountValidation.getCreatedDate().plus(5, ChronoUnit.MINUTES));

        Random random = new Random();
        int randomInteger = random.nextInt(999999);

        String code = String.format("%06d", randomInteger);
        accountValidation.setActivationCode(code);

        accountValidationRepository.save(accountValidation);
        emailService.sendActivationCodeEmail(accountValidation);
    }
}
