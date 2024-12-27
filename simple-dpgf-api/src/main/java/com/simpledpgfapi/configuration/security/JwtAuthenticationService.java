package com.simpledpgfapi.configuration.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtAuthenticationService {

    @Value("${jwt.secret}")
    private String secret;
    @Value("${jwt.expiration-time}")
    private long durationTime;


//    public Cookie generateCookie(String email) {
//        Cookie jwtCookie = new jakarta.servlet.http.Cookie(COOKIE_NAME, createJwtToken(email));
//        jwtCookie.setHttpOnly(true); // empêche l'accès via JS
//        jwtCookie.setMaxAge(cookieDurationTime);
//        return jwtCookie;
//    }





    public String generateJwtToken(String email) {
        return createJwtToken(email);
    }

    private String createJwtToken(String email) {
        final long currentTime = System.currentTimeMillis();
        final long expirationTime = currentTime + this.durationTime;

        // set custom claims

//        Map<String, Object> claims = Map.of(
//                "firstName", user.getFirstName(),
//                "lastName", user.getLastName(),
//                Claims.EXPIRATION, new Date(expirationTime),
//                Claims.SUBJECT, user.getEmail(),
//                "roles", user.getRoles(),
//        );


        return Jwts.builder().setIssuedAt(new Date(currentTime))
                .setExpiration(new Date(expirationTime))
                .setSubject(email)
                // .setClaims(claims)
                .signWith(extractKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // OK
    private Key extractKey() {
        final byte[] decoder = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(decoder);
    }

    //OK
    public Boolean isTokenExpired(String jwtToken) {
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
