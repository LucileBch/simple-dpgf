package com.simpledpgfapi.user.service;

import com.simpledpgfapi.configuration.security.JwtAuthenticationService;
import com.simpledpgfapi.global.exceptions.HttpException;
import com.simpledpgfapi.user.exceptions.AccountValidationErrorCodes;
import com.simpledpgfapi.user.exceptions.UserErrorCodes;
import com.simpledpgfapi.user.mapper.OrganizationMapper;
import com.simpledpgfapi.user.mapper.UserMapper;
import com.simpledpgfapi.user.model.organization.Organization;
import com.simpledpgfapi.user.model.user.User;
import com.simpledpgfapi.user.model.user.dto.*;
import com.simpledpgfapi.user.model.validation.AccountValidationCode;
import com.simpledpgfapi.user.model.validation.dto.AccountValidationCodeDto;
import com.simpledpgfapi.user.repository.AccountValidationCodeRepository;
import com.simpledpgfapi.user.repository.OrganizationRepository;
import com.simpledpgfapi.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;

@Slf4j
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private AccountValidationCodeService accountValidationCodeService;
    @Autowired
    private JwtAuthenticationService jwtAuthenticationService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private OrganizationRepository organizationRepository;
    @Autowired
    private OrganizationMapper organizationMapper;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private AccountValidationCodeRepository accountValidationCodeRepository;
    @Autowired
    private RefreshTokenService refreshTokenService;

    @Transactional
    public UserDto createUser(UserCreationDto userCreationDto) {
        Optional<User> existingUser = userRepository.findByEmail(userCreationDto.getEmail());
        if (existingUser.isPresent()) {
            throw new HttpException(HttpStatus.BAD_REQUEST, UserErrorCodes.USER_ALREADY_EXISTS);
        }

        Organization organization = organizationMapper.creationDtoToModel(userCreationDto.getOrganization());
        organization.setOrganizationType(userCreationDto.getOrganization().getOrganizationType());
        organization.setName(userCreationDto.getOrganization().getName());
        organizationRepository.save(organization);

        // TODO: method UTILS for crypte ?
        String cryptedPassword = bCryptPasswordEncoder.encode(userCreationDto.getPassword());
        User user = userMapper.creationDtoToModel(userCreationDto);
        user.setPassword(cryptedPassword);
        user.setOrganizationId(organization.getId());

        userRepository.insert(user);
        accountValidationCodeService.generateAccountValidationCode(user);

        return userMapper.modelToDto(user, organization);
    }

    public void activateUserAccount(AccountValidationCodeDto accountValidationCodeDto) {
        AccountValidationCode accountValidationCode = accountValidationCodeRepository.findByActivationCode(accountValidationCodeDto.getActivationCode())
                .orElseThrow(()-> new HttpException(HttpStatus.BAD_REQUEST, AccountValidationErrorCodes.INVALID_CODE));

        if(Instant.now().isAfter(accountValidationCode.getExpiration())) {
            accountValidationCodeRepository.delete(accountValidationCode);
            throw new HttpException(HttpStatus.BAD_REQUEST, AccountValidationErrorCodes.CODE_EXPIRED);
        }

        User userAccountToActivate = userRepository.findById(accountValidationCode.getUserId())
                .orElseThrow(() -> new HttpException(HttpStatus.NOT_FOUND, UserErrorCodes.USER_NOT_FOUND));
        userAccountToActivate.setAccountActivated(true);
        userRepository.save(userAccountToActivate);

        accountValidationCodeRepository.delete(accountValidationCode);
    }

    public void generateNewAccountValidationCode(UserCodeRequestDto userCodeRequestDto) {
        User currentUser = userRepository.findByEmail(userCodeRequestDto.getEmail())
                .orElseThrow(()-> new HttpException(HttpStatus.BAD_REQUEST, UserErrorCodes.USER_NOT_FOUND));

        if(currentUser.isAccountActivated()) {
            throw new HttpException(HttpStatus.BAD_REQUEST, UserErrorCodes.USER_ACCOUNT_ALREADY_ACTIVATED);
        }

        accountValidationCodeService.generateAccountValidationCode(currentUser);
    }

    public String authenticateUser(UserAuthenticationDto userAuthenticationDto, HttpServletResponse httpServletResponse) {
        User currentUser = userRepository.findByEmail(userAuthenticationDto.getEmail())
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, UserErrorCodes.USER_NOT_FOUND));

        if(!currentUser.isAccountActivated()) {
            throw new HttpException(HttpStatus.BAD_REQUEST, UserErrorCodes.USER_ACCOUNT_NOT_ACTIVATED);
        }

        final Authentication authenticate = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userAuthenticationDto.getEmail(), userAuthenticationDto.getPassword())
        );

        // si il est authentifié, je génère en JWT + un refresh token
        if(authenticate.isAuthenticated()) {
            String accessToken =  jwtAuthenticationService.generateJwtToken(userAuthenticationDto.getEmail());
            refreshTokenService.createRefreshToken(currentUser.getId(), httpServletResponse);
            return accessToken;

        } else {
            throw new HttpException(HttpStatus.BAD_REQUEST, UserErrorCodes.USER_NOT_AUTHENTICATED);
        }
    }

    public void sendCodeForPasswordUpdate(UserCodeRequestDto userCodeRequestDto){
        User currentUser = userRepository.findByEmail(userCodeRequestDto.getEmail())
                .orElseThrow(()-> new HttpException(HttpStatus.BAD_REQUEST, UserErrorCodes.USER_NOT_FOUND));

        accountValidationCodeService.generateAccountValidationCode(currentUser);
    }

    @Transactional
    public void updateUserPassword(UserUpdatePasswordDto userUpdatePasswordDto) {
        User currentUser = userRepository.findByEmail(userUpdatePasswordDto.getEmail())
                .orElseThrow(()-> new HttpException(HttpStatus.BAD_REQUEST, UserErrorCodes.USER_NOT_FOUND));

        AccountValidationCode accountValidationCode = accountValidationCodeRepository.findByActivationCode(userUpdatePasswordDto.getActivationCode())
                .orElseThrow(()-> new HttpException(HttpStatus.BAD_REQUEST, AccountValidationErrorCodes.INVALID_CODE));

        if(Instant.now().isAfter(accountValidationCode.getExpiration())) {
            accountValidationCodeRepository.delete(accountValidationCode);
            throw new HttpException(HttpStatus.BAD_REQUEST, AccountValidationErrorCodes.CODE_EXPIRED);
        }

        if(accountValidationCode.getUserId().equals(currentUser.getId())) {
            String cryptedPassword = bCryptPasswordEncoder.encode(userUpdatePasswordDto.getPassword());
            currentUser.setPassword(cryptedPassword);
            userRepository.save(currentUser);
        }
    }
}
