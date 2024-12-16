package com.simpledpgfapi.user.service;

import com.simpledpgfapi.global.exceptions.HttpException;
import com.simpledpgfapi.user.exceptions.UserErrorCodes;
import com.simpledpgfapi.user.model.user.User;
import com.simpledpgfapi.user.model.validation.AccountValidation;
import com.simpledpgfapi.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private UserRepository userRepository;

    public void sendActivationCodeEmail(AccountValidation accountValidation) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        // de qui vient le mail
        simpleMailMessage.setFrom("no-reply@example.com");
        // à qui il est envoyé
        User user = userRepository.findById(accountValidation.getUserId()).orElseThrow(() -> new HttpException(HttpStatus.NOT_FOUND, UserErrorCodes.USER_NOT_FOUND));
        simpleMailMessage.setTo(user.getEmail());
        // le sujet
        simpleMailMessage.setSubject("Votre code d'activation");
        simpleMailMessage.setText(String.format("Bonjour %s %s, <br/> Votre code d'activation est %s. Il sera actif pendant 5mn.", user.getFirstName(), user.getLastName(),accountValidation.getActivationCode()));

        javaMailSender.send(simpleMailMessage);
    }
}
