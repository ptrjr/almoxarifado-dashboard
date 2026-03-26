package com.ljs.almoxarifado.controller;

import com.ljs.almoxarifado.model.Produto;
import com.ljs.almoxarifado.repository.ProdutoRepository;
import com.ljs.almoxarifado.repository.EntradaRepository;
import com.ljs.almoxarifado.repository.SaidaRepository;

import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    private final ProdutoRepository produtoRepository;
    private final EntradaRepository entradaRepository;
    private final SaidaRepository saidaRepository;

    public ProdutoController(
            ProdutoRepository produtoRepository,
            EntradaRepository entradaRepository,
            SaidaRepository saidaRepository
    ) {
        this.produtoRepository = produtoRepository;
        this.entradaRepository = entradaRepository;
        this.saidaRepository = saidaRepository;
    }

    @GetMapping
    public List<Produto> listarProdutos() {
        return produtoRepository.findAll();
    }

    @PostMapping
    public Produto criarProduto(@RequestBody Produto produto) {
        return produtoRepository.save(produto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produto> atualizarProduto(
            @PathVariable Long id,
            @RequestBody Produto produtoAtualizado
    ) {

        return produtoRepository.findById(id)
                .map(produto -> {

                    produto.setNome(produtoAtualizado.getNome());
                    produto.setCategoria(produtoAtualizado.getCategoria());
                    produto.setUnidadeMedida(produtoAtualizado.getUnidadeMedida());
                    produto.setEstoqueAtual(produtoAtualizado.getEstoqueAtual());
                    produto.setEstoqueMinimo(produtoAtualizado.getEstoqueMinimo());

                    Produto salvo = produtoRepository.save(produto);

                    return ResponseEntity.ok(salvo);

                }).orElse(ResponseEntity.notFound().build());

    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> deletarProduto(@PathVariable Long id) {

        try {

            // verifica se produto existe
            if (!produtoRepository.existsById(id)) {
                return ResponseEntity.status(404).body("Produto não encontrado");
            }

            // remove entradas relacionadas
            entradaRepository.deleteByProdutoId(id);

            // remove saídas relacionadas
            saidaRepository.deleteByProdutoId(id);

            // remove produto
            produtoRepository.deleteById(id);

            return ResponseEntity.ok("Produto deletado com sucesso");

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(500)
                    .body("Erro ao deletar produto: " + e.getMessage());

        }

    }

}