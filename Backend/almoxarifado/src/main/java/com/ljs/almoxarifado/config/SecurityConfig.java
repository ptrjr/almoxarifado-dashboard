package com.ljs.almoxarifado.config;

import com.ljs.almoxarifado.security.JwtFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        return http
                .csrf(csrf -> csrf.disable())

                // 👇 ESSA LINHA RESOLVE O 403
                .cors(cors -> {})

                .authorizeHttpRequests(auth -> auth

                        // libera login
                        .requestMatchers("/auth/**").permitAll()

                        // libera GET (visualização pública)
                        .requestMatchers(HttpMethod.GET, "/**").permitAll()

                        // resto protegido
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}