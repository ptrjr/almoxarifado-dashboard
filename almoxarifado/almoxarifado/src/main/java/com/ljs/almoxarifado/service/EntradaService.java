package com.ljs.almoxarifado.service;

import com.ljs.almoxarifado.model.Entrada;
import com.ljs.almoxarifado.model.Produto;
import com.ljs.almoxarifado.repository.EntradaRepository;
import com.ljs.almoxarifado.repository.ProdutoRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EntradaService {

    private final EntradaRepository entradaRepository;
    private final ProdutoRepository produtoRepository;

    public EntradaService(
            EntradaRepository entradaRepository,
            ProdutoRepository produtoRepository
    ) {
        this.entradaRepository = entradaRepository;
        this.produtoRepository = produtoRepository;
    }

    public List<Entrada> listarEntradas() {
        return entradaRepository.findAll();
    }

    @Transactional
    public Entrada salvarEntrada(Entrada entrada) {

        // 🔍 validações
        if (entrada.getProdutoId() == null) {
            throw new RuntimeException("Produto não informado");
        }

        if (entrada.getQuantidade() == null || entrada.getQuantidade() <= 0) {
            throw new RuntimeException("Quantidade inválida");
        }

        // 🔍 busca produto
        Produto produto = produtoRepository.findById(entrada.getProdutoId())
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        // 🔥 evita null no estoque
        int estoqueAtual = produto.getEstoqueAtual() != null
                ? produto.getEstoqueAtual()
                : 0;

        // 🔥 atualiza estoque
        produto.setEstoqueAtual(
                estoqueAtual + entrada.getQuantidade()
        );

        produtoRepository.save(produto);

        // 🔥 define data automática
        entrada.setDataEntrada(LocalDateTime.now());

        return entradaRepository.save(entrada);
    }
}