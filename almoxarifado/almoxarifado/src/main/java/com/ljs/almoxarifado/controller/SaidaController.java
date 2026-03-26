package com.ljs.almoxarifado.controller;

import com.ljs.almoxarifado.model.Saida;
import com.ljs.almoxarifado.repository.FilialRepository;
import com.ljs.almoxarifado.service.SaidaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/saidas")
public class SaidaController {

    private final SaidaService saidaService;

    public SaidaController(SaidaService saidaService) {
        this.saidaService = saidaService;
    }

    @PostMapping
    public Saida registrarSaida(@RequestBody Saida saida) {
        return saidaService.registrarSaida(saida);
    }

    @GetMapping
    public List<Saida> listarSaidas() {
        return saidaService.listarSaidas();
    }

    @Autowired
    private FilialRepository filialRepository;
}