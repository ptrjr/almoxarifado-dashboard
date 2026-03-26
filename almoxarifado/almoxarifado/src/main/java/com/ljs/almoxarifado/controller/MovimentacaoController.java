package com.ljs.almoxarifado.controller;

import com.ljs.almoxarifado.dto.MovimentacaoDTO;
import com.ljs.almoxarifado.service.MovimentacaoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/movimentacoes")
public class MovimentacaoController {

    private final MovimentacaoService movimentacaoService;

    public MovimentacaoController(MovimentacaoService movimentacaoService) {
        this.movimentacaoService = movimentacaoService;
    }

    // 🔥 CRIAR MOVIMENTAÇÃO
    @PostMapping
    public void criarMovimentacao(@RequestBody MovimentacaoDTO dto) {
        movimentacaoService.criarMovimentacao(dto);
    }

    @GetMapping
    public List<MovimentacaoDTO> listarMovimentacoes(
            @RequestParam(required = false) Long filialId,
            @RequestParam(required = false) String dataInicio,
            @RequestParam(required = false) String dataFim
    ) {
        return movimentacaoService.listarMovimentacoes(filialId);
    }
}