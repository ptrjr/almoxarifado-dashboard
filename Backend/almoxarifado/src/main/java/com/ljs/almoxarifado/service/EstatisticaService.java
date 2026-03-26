package com.ljs.almoxarifado.service;

import com.ljs.almoxarifado.dto.ProdutoMaisUsadoDTO;
import com.ljs.almoxarifado.model.Produto;
import com.ljs.almoxarifado.repository.ProdutoRepository;
import com.ljs.almoxarifado.repository.SaidaRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EstatisticaService {

    private final SaidaRepository saidaRepository;
    private final ProdutoRepository produtoRepository;

    public EstatisticaService(
            SaidaRepository saidaRepository,
            ProdutoRepository produtoRepository
    ) {
        this.saidaRepository = saidaRepository;
        this.produtoRepository = produtoRepository;
    }

    public List<ProdutoMaisUsadoDTO> produtosMaisUsados() {

        List<Object[]> dados = saidaRepository.somarSaidasPorProduto();

        List<ProdutoMaisUsadoDTO> resultado = new ArrayList<>();

        for (Object[] linha : dados) {

            Long produtoId = (Long) linha[0];
            Long total = (Long) linha[1];

            Produto produto = produtoRepository.findById(produtoId)
                    .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

            ProdutoMaisUsadoDTO dto = new ProdutoMaisUsadoDTO();
            dto.setNome(produto.getNome());
            dto.setQuantidade(total.intValue());

            resultado.add(dto);
        }

        return resultado;
    }
}