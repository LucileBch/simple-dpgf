package com.simpledpgfapi.user.service;

import com.simpledpgfapi.user.model.user.User;
import com.simpledpgfapi.user.model.validation.AccountValidationCode;
import com.simpledpgfapi.user.repository.AccountValidationCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Random;

@Service
public class AccountValidationCodeService {
    @Autowired
    private AccountValidationCodeRepository accountValidationCodeRepository;
    @Autowired
    private EmailService emailService;

    public void generateAccountValidationCode(User user) {
        AccountValidationCode accountValidationCode = new AccountValidationCode();
        accountValidationCode.setUserId(user.getId());
        accountValidationCode.setCreatedDate(Instant.now());
        accountValidationCode.setExpiration(accountValidationCode.getCreatedDate().plus(5, ChronoUnit.MINUTES));

        Random random = new Random();
        int randomInteger = random.nextInt(999999);
        String code = String.format("%06d", randomInteger);
        accountValidationCode.setActivationCode(code);

        accountValidationCodeRepository.save(accountValidationCode);
        emailService.sendActivationCodeEmail(accountValidationCode);
    }
}
