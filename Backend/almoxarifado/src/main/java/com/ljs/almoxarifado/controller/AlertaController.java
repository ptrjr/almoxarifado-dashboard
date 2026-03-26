package com.ljs.almoxarifado.controller;

import com.ljs.almoxarifado.dto.AlertaEstoqueDTO;
import com.ljs.almoxarifado.service.AlertaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/alertas")
public class AlertaController {

    private final AlertaService alertaService;

    public AlertaController(AlertaService alertaService) {
        this.alertaService = alertaService;
    }

    @GetMapping
    public List<AlertaEstoqueDTO> listarAlertas() {
        return alertaService.verificarAlertas();
    }
}