package com.ljs.almoxarifado.controller;

import com.ljs.almoxarifado.dto.ProdutoMaisUsadoDTO;
import com.ljs.almoxarifado.service.EstatisticaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/estatisticas")
public class EstatisticaController {

    private final EstatisticaService estatisticaService;

    public EstatisticaController(EstatisticaService estatisticaService) {
        this.estatisticaService = estatisticaService;
    }

    @GetMapping("/mais-usados")
    public List<ProdutoMaisUsadoDTO> produtosMaisUsados() {
        return estatisticaService.produtosMaisUsados();
    }
}