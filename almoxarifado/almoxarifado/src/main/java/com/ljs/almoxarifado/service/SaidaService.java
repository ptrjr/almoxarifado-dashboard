package com.ljs.almoxarifado.service;

import com.ljs.almoxarifado.model.Saida;
import com.ljs.almoxarifado.model.Produto;
import com.ljs.almoxarifado.repository.SaidaRepository;
import com.ljs.almoxarifado.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SaidaService {

    private final SaidaRepository saidaRepository;
    private final ProdutoRepository produtoRepository;

    public SaidaService(SaidaRepository saidaRepository, ProdutoRepository produtoRepository) {
        this.saidaRepository = saidaRepository;
        this.produtoRepository = produtoRepository;
    }

    public Saida registrarSaida(Saida saida) {

        // 🔒 Validações básicas
        if (saida.getProdutoId() == null) {
            throw new RuntimeException("Produto não informado");
        }

        if (saida.getQuantidade() == null || saida.getQuantidade() <= 0) {
            throw new RuntimeException("Quantidade inválida");
        }

        // 🔍 Busca produto no banco
        Produto produtoBanco = produtoRepository.findById(saida.getProdutoId())
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        // 🛡️ Proteção contra null
        if (produtoBanco.getEstoqueAtual() == null) {
            produtoBanco.setEstoqueAtual(0);
        }

        // 🚫 Validação de estoque
        if (produtoBanco.getEstoqueAtual() < saida.getQuantidade()) {
            throw new RuntimeException("Estoque insuficiente");
        }

        // 📉 Atualiza estoque
        produtoBanco.setEstoqueAtual(
                produtoBanco.getEstoqueAtual() - saida.getQuantidade()
        );

        produtoRepository.save(produtoBanco);

        // 🕒 Define data automaticamente
        saida.setDataSaida(LocalDateTime.now());

        // 💾 Salva saída
        return saidaRepository.save(saida);
    }

    public List<Saida> listarSaidas() {
        return saidaRepository.findAll();
    }
}