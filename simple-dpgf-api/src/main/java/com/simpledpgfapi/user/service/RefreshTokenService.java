package com.simpledpgfapi.user.service;

import com.simpledpgfapi.configuration.security.JwtAuthenticationService;
import com.simpledpgfapi.global.exceptions.HttpException;
import com.simpledpgfapi.user.exceptions.TokenErrorCodes;
import com.simpledpgfapi.user.exceptions.UserErrorCodes;
import com.simpledpgfapi.user.model.refreshtoken.RefreshToken;
import com.simpledpgfapi.user.model.refreshtoken.dto.RefreshTokenDto;
import com.simpledpgfapi.user.model.refreshtoken.dto.RefreshTokenResponseDto;
import com.simpledpgfapi.user.model.user.User;
import com.simpledpgfapi.user.repository.RefreshTokenRepository;
import com.simpledpgfapi.user.repository.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
public class RefreshTokenService {
    @Autowired
    private RefreshTokenRepository refreshTokenRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtAuthenticationService jwtAuthenticationService;

    @Value("${jwt.refresh-token-expiration-time}")
    private long refreshTokenDurationTime;

    private final String COOKIE_NAME="token";
    @Value("${cookie.expiration-time}")
    private int cookieDurationTime;

    //TODO : voir ce que l'on passe ici si comme en dessous on passe le mail -> userrepostiroy.findByEmail
    public RefreshToken createRefreshToken(ObjectId userId){
        RefreshToken refreshToken = new RefreshToken();
        String grossRefreshToken = UUID.randomUUID().toString();
        refreshToken.setUserId(userId);
        refreshToken.setToken(bCryptPasswordEncoder.encode(grossRefreshToken));
        refreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenDurationTime));
        refreshToken.setRevoked(false);

        refreshTokenRepository.save(refreshToken);

        refreshToken.setToken(grossRefreshToken);
        return refreshToken;
    }

    //TODO: refaire avec DTO ?
    public RefreshToken verifyExpiration(RefreshToken refreshToken){
        if(refreshToken.getExpiryDate().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(refreshToken);
            throw new HttpException(HttpStatus.UNAUTHORIZED, TokenErrorCodes.REFRESH_TOKEN_EXPIRED);
        }
        return refreshToken;
    }

    public RefreshTokenResponseDto generateNewAccessToken(RefreshTokenDto refreshTokenDto) {
       RefreshToken storedRefreshToken = refreshTokenRepository.findAll()
               .stream()
               .filter(token -> bCryptPasswordEncoder.matches(refreshTokenDto.getRefreshToken(), token.getToken()))
               .findFirst()
               .map(this::verifyExpiration)
               .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, TokenErrorCodes.REFRESH_TOKEN_NOT_FOUND));

        User currentUser = userRepository.findById(storedRefreshToken.getUserId())
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, UserErrorCodes.USER_NOT_FOUND));

        String newAccessToken = jwtAuthenticationService.generateJwtToken(currentUser.getEmail());

        RefreshTokenResponseDto refreshTokenResponseDto = new RefreshTokenResponseDto();
        refreshTokenResponseDto.setAccessToken(newAccessToken);
        refreshTokenResponseDto.setRefreshToken(refreshTokenDto.getRefreshToken());

        return refreshTokenResponseDto;
    }
    // TODO end refresh token here
}
