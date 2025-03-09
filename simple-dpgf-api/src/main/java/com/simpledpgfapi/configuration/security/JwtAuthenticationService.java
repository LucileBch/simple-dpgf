package com.simpledpgfapi.configuration.security;

import com.simpledpgfapi.user.model.user.User;
import com.simpledpgfapi.user.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
    private long expirationTime;

    public String generateJwtToken(String email, User user) {
        return createJwtToken(email, user);
    }

    private String createJwtToken(String email, User user) {
        final long currentTime = System.currentTimeMillis();
        final long expiryDate = currentTime + this.expirationTime;

        final Map<String, Object> extraClaims = Map.of(
                "id", user.getId().toString(),
                "role", user.getRole()
        );

        return Jwts.builder()
                .setIssuedAt(new Date(currentTime))
                .setExpiration(new Date(expiryDate))
                .setSubject(email)
                .addClaims(extraClaims)
                .signWith(extractKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private Key extractKey() {
        final byte[] decoder = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(decoder);
    }

    public boolean isTokenValid(String jwtToken, UserDetails userDetails) {
        final String userEmail = extractEmail(jwtToken);
        return (userEmail.equals(userDetails.getUsername())) && !isTokenExpired(jwtToken);
    }

    private boolean isTokenExpired(String jwtToken) {
        Date expirationDate = extractExpiration(jwtToken);
        return expirationDate.before(new Date());
    }

    private Date extractExpiration(String jwtToken) {
        return extractClaim(jwtToken, Claims::getExpiration);
    }

    private <T> T extractClaim(String jwtToken, Function<Claims, T> claimsResolver) {
        Claims claims = extractAllClaims(jwtToken);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String jwtToken) {
        return Jwts.parserBuilder()
                .setSigningKey(extractKey())
                .build()
                .parseClaimsJws(jwtToken)
                .getBody();
    }

    public String extractEmail(String jwtToken) {
        return extractClaim(jwtToken, Claims::getSubject);
    }
}
