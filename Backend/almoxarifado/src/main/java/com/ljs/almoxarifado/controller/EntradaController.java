package com.ljs.almoxarifado.controller;

import com.ljs.almoxarifado.model.Entrada;
import com.ljs.almoxarifado.repository.FilialRepository;
import com.ljs.almoxarifado.service.EntradaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/entradas")
public class EntradaController {

    private final EntradaService entradaService;

    public EntradaController(EntradaService entradaService) {
        this.entradaService = entradaService;
    }

    @GetMapping
    public List<Entrada> listarEntradas() {
        return entradaService.listarEntradas();
    }

    @PostMapping
    public Entrada criarEntrada(@RequestBody Entrada entrada) {
        return entradaService.salvarEntrada(entrada);
    }

    @Autowired
    private FilialRepository filialRepository;
}