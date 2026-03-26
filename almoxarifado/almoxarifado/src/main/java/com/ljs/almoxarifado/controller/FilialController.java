package com.ljs.almoxarifado.controller;

import com.ljs.almoxarifado.model.Filial;
import com.ljs.almoxarifado.repository.FilialRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/filiais")
@CrossOrigin(origins = "http://localhost:5173")
public class FilialController {

    private final FilialRepository filialRepository;

    public FilialController(FilialRepository filialRepository) {
        this.filialRepository = filialRepository;
    }

    // 🔥 GET - LISTAR FILIAIS
    @GetMapping
    public List<Filial> listarFiliais() {
        return filialRepository.findAll();
    }
}