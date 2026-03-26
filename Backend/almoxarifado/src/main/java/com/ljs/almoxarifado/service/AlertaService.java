package com.ljs.almoxarifado.service;

import com.ljs.almoxarifado.dto.AlertaEstoqueDTO;
import com.ljs.almoxarifado.model.Produto;
import com.ljs.almoxarifado.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AlertaService {

    private final ProdutoRepository produtoRepository;

    public AlertaService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    public List<AlertaEstoqueDTO> verificarAlertas() {

        List<AlertaEstoqueDTO> alertas = new ArrayList<>();

        List<Produto> produtos = produtoRepository.findAll();

        for (Produto produto : produtos) {

            if (produto.getEstoqueAtual() <= produto.getEstoqueMinimo()) {

                alertas.add(
                        new AlertaEstoqueDTO(
                                produto.getNome(),
                                produto.getEstoqueAtual(),
                                produto.getEstoqueMinimo()
                        )
                );

            }

        }

        return alertas;
    }
}
