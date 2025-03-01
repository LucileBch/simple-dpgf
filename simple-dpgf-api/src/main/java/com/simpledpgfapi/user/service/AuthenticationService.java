package com.simpledpgfapi.user.service;

import com.simpledpgfapi.configuration.security.JwtAuthenticationService;
import com.simpledpgfapi.global.exceptions.HttpException;
import com.simpledpgfapi.user.exceptions.AccountValidationErrorCodes;
import com.simpledpgfapi.user.exceptions.UserErrorCodes;
import com.simpledpgfapi.user.mapper.OrganizationMapper;
import com.simpledpgfapi.user.mapper.UserMapper;
import com.simpledpgfapi.user.model.organization.Organization;
import com.simpledpgfapi.user.model.organization.OrganizationStatusEnum;
import com.simpledpgfapi.user.model.role.RoleEnum;
import com.simpledpgfapi.user.model.user.User;
import com.simpledpgfapi.user.model.user.UserStatusEnum;
import com.simpledpgfapi.user.model.user.dto.*;
import com.simpledpgfapi.user.model.validation.AccountValidationCode;
import com.simpledpgfapi.user.model.validation.dto.AccountValidationCodeDto;
import com.simpledpgfapi.user.repository.AccountValidationCodeRepository;
import com.simpledpgfapi.user.repository.UserRepository;
import com.simpledpgfapi.user.repository.organizationrepository.OrganizationRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
public class AuthenticationService {
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

    private static final String JWT_TOKEN = "accessToken";
    private static final String COOKIE_NAME = "refreshToken";

    @Transactional
    public UserDto createUser(UserCreationDto userCreationDto) {
        return createUser(userCreationDto, RoleEnum.ORGANIZATION_MANAGER);
    }

    public UserDto createUser(UserCreationDto userCreationDto, RoleEnum role) {
        Optional<User> existingUser = userRepository.findByEmail(userCreationDto.getEmail());
        if (existingUser.isPresent()) {
               throw new HttpException(HttpStatus.BAD_REQUEST, UserErrorCodes.USER_ALREADY_EXISTS);
        }

        if(organizationRepository.findByName(userCreationDto.getOrganization().getName()) == null){
            Organization organization = organizationMapper.creationDtoToModel(userCreationDto.getOrganization());
            organization.setOrganizationType(userCreationDto.getOrganization().getOrganizationType());
            organization.setName(userCreationDto.getOrganization().getName());
            organization.setOrganizationStatus(OrganizationStatusEnum.ACTIVE);
            organization.setMemberLicenseCounter(1.);
            organization.setMaxMemberLicenseCounter(3.);
            organization.setProjectLicenseCounter(0.);
            organization.setMaxProjectLicenseCounter(3.);
            organizationRepository.save(organization);
        }

        Organization organization = organizationRepository.findByName(userCreationDto.getOrganization().getName());

        String cryptedPassword = bCryptPasswordEncoder.encode(userCreationDto.getPassword());
        User user = userMapper.creationDtoToModel(userCreationDto);
        user.setPassword(cryptedPassword);
        user.setOrganizationId(organization.getId());
        user.setRole(role);
        user.setUserStatus(UserStatusEnum.ACTIVE);

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

    public ResponseEntity<Map<String, Object>> authenticateUser(UserAuthenticationDto userAuthenticationDto) {
        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userAuthenticationDto.getEmail(), userAuthenticationDto.getPassword())
        );

        User currentUser = userRepository.findByEmail(userAuthenticationDto.getEmail())
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, UserErrorCodes.USER_NOT_FOUND));

        if(currentUser.getUserStatus() == UserStatusEnum.DELETED) {
            throw new HttpException(HttpStatus.BAD_REQUEST, UserErrorCodes.USER_DELETED);
        }

        if(authentication.isAuthenticated()) {
            String accessToken = jwtAuthenticationService.generateJwtToken(userAuthenticationDto.getEmail());
            String refreshToken = refreshTokenService.createRefreshToken(currentUser.getId());

            Map<String, Object> response = new HashMap<>();
            response.put(JWT_TOKEN, accessToken);
            response.put(COOKIE_NAME, refreshToken);
            response.put("user", userMapper.modelToUserDetailsDto(currentUser));

            return ResponseEntity.ok(response);
        } else {
            throw new HttpException(HttpStatus.BAD_REQUEST, UserErrorCodes.USER_NOT_AUTHENTICATED);
        }
    }

    public void signOutUserAndRevokeRefreshToken(HttpServletRequest httpServletRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication == null || !authentication.isAuthenticated()) {
           throw new HttpException(HttpStatus.UNAUTHORIZED, UserErrorCodes.USER_NOT_AUTHENTICATED);
        }

        String refreshTokenFromCookie = refreshTokenService.getRefreshTokenFromCookies(httpServletRequest);
        refreshTokenService.revokeRefreshToken(refreshTokenFromCookie);

        SecurityContextHolder.clearContext();
    }

    public void sendCodeNewPasswordRequest(UserCodeRequestDto userCodeRequestDto){
        User currentUser = userRepository.findByEmail(userCodeRequestDto.getEmail())
                .orElseThrow(()-> new HttpException(HttpStatus.BAD_REQUEST, UserErrorCodes.USER_NOT_FOUND));

        accountValidationCodeService.generateAccountValidationCode(currentUser);
    }

    @Transactional
    public void updateUserNewPassword(UserPasswordResetDto userPasswordResetDto) {
        User currentUser = userRepository.findByEmail(userPasswordResetDto.getEmail())
                .orElseThrow(()-> new HttpException(HttpStatus.BAD_REQUEST, UserErrorCodes.USER_NOT_FOUND));

        AccountValidationCode accountValidationCode = accountValidationCodeRepository.findByActivationCode(userPasswordResetDto.getActivationCode())
                .orElseThrow(()-> new HttpException(HttpStatus.BAD_REQUEST, AccountValidationErrorCodes.INVALID_CODE));

        if(Instant.now().isAfter(accountValidationCode.getExpiration())) {
            accountValidationCodeRepository.delete(accountValidationCode);
            throw new HttpException(HttpStatus.BAD_REQUEST, AccountValidationErrorCodes.CODE_EXPIRED);
        }

        if(accountValidationCode.getUserId().equals(currentUser.getId())) {
            String cryptedPassword = bCryptPasswordEncoder.encode(userPasswordResetDto.getPassword());
            currentUser.setPassword(cryptedPassword);
            userRepository.save(currentUser);
        }
    }
}
