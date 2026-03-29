package com.ljs.almoxarifado.controller;

import com.ljs.almoxarifado.security.JwtService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final JwtService jwtService;

    public AuthController(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> body) {

        String email = body.get("email");
        String senha = body.get("senha");

        // LOGIN FIXO (simples por enquanto)
        if (!"rh@ljs.com.br".equals(email) || !"32270229".equals(senha)) {
            throw new RuntimeException("Credenciais inválidas");
        }

        String token = jwtService.gerarToken(email);

        return Map.of("token", token);
    }
}