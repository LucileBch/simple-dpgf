package com.simpledpgfapi.configuration.security;

import com.simpledpgfapi.global.exceptions.HttpException;
import com.simpledpgfapi.user.exceptions.UserErrorCodes;
import com.simpledpgfapi.user.model.user.User;
import com.simpledpgfapi.user.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtAuthenticationService {
    @Autowired
    private UserRepository userRepository;

    @Value("${jwt.secret}")
    private String secret;
    @Value("${jwt.expiration-time}")
    private long durationTime;

    public String generateJwtToken(String email) {
        return createJwtToken(email);
    }

    private String createJwtToken(String email) {
        final long currentTime = System.currentTimeMillis();
        final long expirationTime = currentTime + this.durationTime;

        User currentUser = userRepository.findByEmail(email).orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, UserErrorCodes.USER_NOT_FOUND));

        // set custom claims
        final Map<String, Object> extraClaims = Map.of(
                "id", currentUser.getId().toString(),
                "role", currentUser.getRole()
        );

        return Jwts.builder()
                .setIssuedAt(new Date(currentTime))
                .setExpiration(new Date(expirationTime))
                .setSubject(email)
                .addClaims(extraClaims)
                .signWith(extractKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // OK
    private Key extractKey() {
        final byte[] decoder = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(decoder);
    }

    public boolean isTokenValid(String jwtToken, UserDetails userDetails) {
        final String userEmail = extractEmail(jwtToken);
        return (userEmail.equals(userDetails.getUsername())) && !isTokenExpired(jwtToken);
    }

    //OK
    private boolean isTokenExpired(String jwtToken) {
        Date expirationDate = extractExpiration(jwtToken);
        return expirationDate.before(new Date());
    }

    private Date extractExpiration(String jwtToken) {
        return extractClaim(jwtToken, Claims::getExpiration);
    }

    // OK
    // méthode qui permet de récupérer UN claim de toute les claims  OKOK
    private <T> T extractClaim(String jwtToken, Function<Claims, T> claimsResolver) {
        Claims claims = extractAllClaims(jwtToken);
        return claimsResolver.apply(claims);
    }

    //OK
    // on donne le token
    // on récupère les claims
    private Claims extractAllClaims(String jwtToken) {
        return Jwts.parserBuilder()
                .setSigningKey(extractKey())
                .build()
                .parseClaimsJws(jwtToken)
                .getBody();
    }

    // OK
    public String extractEmail(String jwtToken) {
        return extractClaim(jwtToken, Claims::getSubject);
    }
}
