package com.simpledpgfapi.user.service;

import com.simpledpgfapi.global.exceptions.HttpException;
import com.simpledpgfapi.user.exceptions.UserErrorCodes;
import com.simpledpgfapi.user.model.invitation.dto.InvitationCreationDto;
import com.simpledpgfapi.user.model.user.User;
import com.simpledpgfapi.user.model.validation.AccountValidationCode;
import com.simpledpgfapi.user.repository.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class EmailService {
    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private UserRepository userRepository;

    public void sendActivationCodeEmail(AccountValidationCode accountValidationCode) {
        try{
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);

            mimeMessageHelper.setFrom("postmaster@sandbox3088a94949134493bf0e402263111360.mailgun.org");

            User user = userRepository.findById(accountValidationCode.getUserId())
                    .orElseThrow(() -> new HttpException(HttpStatus.NOT_FOUND, UserErrorCodes.USER_NOT_FOUND));

            mimeMessageHelper.setTo(user.getEmail());

            mimeMessageHelper.setSubject("Votre code d'activation");

            String htmlContent = String.format("Bonjour %s %s, <br/> Votre code d'activation est %s. Il sera actif pendant 5mn.",
                                                user.getFirstName(), user.getLastName(),accountValidationCode.getActivationCode());
            mimeMessageHelper.setText(htmlContent, true);

            javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
            log.error("Un problème est survenu : {}", e.getMessage());
        }
    }

    public void sendInvitationMessage(InvitationCreationDto invitationCreationDto, String emailSender, String firstName, String lastName, String invitationLink) {
        try{
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);

            mimeMessageHelper.setFrom(emailSender);
            mimeMessageHelper.setTo(invitationCreationDto.getEmailReceiver());
            mimeMessageHelper.setSubject("Votre lien d'invitation à rejoindre Simple DPGF");

            String htmlContent = String.format("Bonjour %s %s,<br/> %s %s vous invite à rejoindre son organisation." +
                            "<br/> Veuillez cliquer sur <a href='%s'>ce lien</a>  pour créer votre compte.",
                    invitationCreationDto.getFirstName(), invitationCreationDto.getLastName(),
                    firstName, lastName, invitationLink);
            mimeMessageHelper.setText(htmlContent, true);

            javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
            log.error("Un problème est survenu : {}", e.getMessage());
        }
    }
}
