package com.simpledpgfapi.user.service;

import com.simpledpgfapi.configuration.security.JwtAuthenticationService;
import com.simpledpgfapi.global.exceptions.HttpException;
import com.simpledpgfapi.user.exceptions.RefreshTokenErrorCodes;
import com.simpledpgfapi.user.exceptions.UserErrorCodes;
import com.simpledpgfapi.user.model.refreshtoken.RefreshToken;
import com.simpledpgfapi.user.model.user.User;
import com.simpledpgfapi.user.repository.RefreshTokenRepository;
import com.simpledpgfapi.user.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
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
    private long refreshTokenExpiry;
    private static final String COOKIE_NAME = "token";
    @Value("${cookie.expiration-time}")
    private int cookieExpiry;

    public void createRefreshToken(ObjectId userId, HttpServletResponse response) {
        List<RefreshToken> existingRefreshTokensByUserId = refreshTokenRepository.findByUserId(userId);

        if (!existingRefreshTokensByUserId.isEmpty()) {
            for (RefreshToken existingRefreshToken : existingRefreshTokensByUserId) {
                if (!existingRefreshToken.isRevoked()) {
                    existingRefreshToken.setRevoked(true);
                    refreshTokenRepository.save(existingRefreshToken);
                }
            }
        }

        RefreshToken refreshToken = new RefreshToken();
        String initialRefreshToken = UUID.randomUUID().toString();
        refreshToken.setUserId(userId);
        refreshToken.setToken(bCryptPasswordEncoder.encode(initialRefreshToken));
        refreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenExpiry));
        refreshToken.setRevoked(false);

        refreshTokenRepository.save(refreshToken);

        Cookie refreshTokenCookie = new Cookie(COOKIE_NAME, initialRefreshToken);
        //refreshTokenCookie.setHttpOnly(true);
        //refreshTokenCookie.setSecure(false);
        refreshTokenCookie.setPath("/");
       // refreshTokenCookie.setDomain("localhost");
        refreshTokenCookie.setMaxAge(cookieExpiry);
        response.addCookie(refreshTokenCookie);
    }

    public String generateNewAccessToken(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {
        String refreshTokenFromCookie = getRefreshTokenFromCookies(httpServletRequest);

        RefreshToken storedRefreshToken = refreshTokenRepository.findAll()
                .stream()
                .filter(token -> bCryptPasswordEncoder.matches(refreshTokenFromCookie, token.getToken()))
                .findFirst()
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, RefreshTokenErrorCodes.REFRESH_TOKEN_NOT_FOUND));

        if (storedRefreshToken.isRevoked()) {
            throw new HttpException(HttpStatus.UNAUTHORIZED, RefreshTokenErrorCodes.REFRESH_TOKEN_REVOKED);
        }

        verifyExpiryDate(storedRefreshToken);

        User currentUser = userRepository.findById(storedRefreshToken.getUserId())
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, UserErrorCodes.USER_NOT_FOUND));

        String newAccessToken = jwtAuthenticationService.generateJwtToken(currentUser.getEmail());

        String newRefreshToken = UUID.randomUUID().toString();
        storedRefreshToken.setToken(bCryptPasswordEncoder.encode(newRefreshToken));
        storedRefreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenExpiry));
        refreshTokenRepository.save(storedRefreshToken);

        Cookie newRefreshTokenCookie = new Cookie(COOKIE_NAME, newRefreshToken);
        //newRefreshTokenCookie.setHttpOnly(true);
        newRefreshTokenCookie.setPath("/");
        //newRefreshTokenCookie.setDomain("localhost");
        newRefreshTokenCookie.setMaxAge(cookieExpiry);
        httpServletResponse.addCookie(newRefreshTokenCookie);

        return newAccessToken;
    }

    private void verifyExpiryDate(RefreshToken refreshToken) {
        if (refreshToken.getExpiryDate().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(refreshToken);
            throw new HttpException(HttpStatus.UNAUTHORIZED, RefreshTokenErrorCodes.REFRESH_TOKEN_EXPIRED);
        }
    }

    public String getRefreshTokenFromCookies(HttpServletRequest httpServletRequest) {
        String refreshTokenFromCookie = null;

        Cookie[] cookies = httpServletRequest.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (COOKIE_NAME.equals(cookie.getName())) {
                    refreshTokenFromCookie = cookie.getValue();
                    break;
                }
            }
        }

        if (refreshTokenFromCookie == null) {
            throw new HttpException(HttpStatus.BAD_REQUEST, RefreshTokenErrorCodes.REFRESH_TOKEN_NOT_IN_COOKIE);
        }

        return refreshTokenFromCookie;
    }

    public void revokeRefreshToken(String refreshToken) {
        RefreshToken storedRefreshToken = refreshTokenRepository.findAll()
                .stream()
                .filter(token -> bCryptPasswordEncoder.matches(refreshToken, token.getToken()))
                .findFirst()
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, RefreshTokenErrorCodes.REFRESH_TOKEN_NOT_FOUND));

        storedRefreshToken.setRevoked(true);
        refreshTokenRepository.save(storedRefreshToken);
    }

    public void removeRefreshTokenFromCookie(HttpServletResponse httpServletResponse){
        Cookie cookie = new Cookie(COOKIE_NAME, null);
        cookie.setMaxAge(0);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        httpServletResponse.addCookie(cookie);
    }
}
