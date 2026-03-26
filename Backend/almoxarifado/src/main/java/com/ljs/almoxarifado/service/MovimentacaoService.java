package com.ljs.almoxarifado.service;

import com.ljs.almoxarifado.dto.MovimentacaoDTO;
import com.ljs.almoxarifado.model.Entrada;
import com.ljs.almoxarifado.model.Saida;
import com.ljs.almoxarifado.model.Produto;
import com.ljs.almoxarifado.model.Filial;
import com.ljs.almoxarifado.repository.EntradaRepository;
import com.ljs.almoxarifado.repository.SaidaRepository;
import com.ljs.almoxarifado.repository.ProdutoRepository;
import com.ljs.almoxarifado.repository.FilialRepository;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MovimentacaoService {

    private final EntradaRepository entradaRepository;
    private final SaidaRepository saidaRepository;
    private final ProdutoRepository produtoRepository;
    private final FilialRepository filialRepository;

    public MovimentacaoService(
            EntradaRepository entradaRepository,
            SaidaRepository saidaRepository,
            ProdutoRepository produtoRepository,
            FilialRepository filialRepository
    ) {
        this.entradaRepository = entradaRepository;
        this.saidaRepository = saidaRepository;
        this.produtoRepository = produtoRepository;
        this.filialRepository = filialRepository;
    }

    // 🔥 CRIAR MOVIMENTAÇÃO (CORRIGIDO)
    public void criarMovimentacao(MovimentacaoDTO dto) {

        Filial filial = filialRepository.findById(dto.getFilialId())
                .orElseThrow(() -> new RuntimeException("Filial não encontrada"));

        Produto produto = produtoRepository.findById(dto.getProdutoId())
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        // 🔥 evita null
        Integer estoqueAtualObj = produto.getEstoqueAtual();
        int estoqueAtual = (estoqueAtualObj == null) ? 0 : estoqueAtualObj;

        if ("ENTRADA".equalsIgnoreCase(dto.getTipo())) {

            Entrada entrada = new Entrada();
            entrada.setProdutoId(dto.getProdutoId());
            entrada.setQuantidade(dto.getQuantidade());
            entrada.setDataEntrada(dto.getData());
            entrada.setFilial(filial);

            entradaRepository.save(entrada);

            produto.setEstoqueAtual(estoqueAtual + dto.getQuantidade());

            produtoRepository.save(produto);

        } else if ("SAIDA".equalsIgnoreCase(dto.getTipo())) {

            if (estoqueAtual < dto.getQuantidade()) {
                throw new RuntimeException("Estoque insuficiente");
            }

            Saida saida = new Saida();
            saida.setProdutoId(dto.getProdutoId());
            saida.setQuantidade(dto.getQuantidade());
            saida.setDataSaida(dto.getData());
            saida.setFilial(filial);

            saidaRepository.save(saida);

            produto.setEstoqueAtual(estoqueAtual - dto.getQuantidade());

            produtoRepository.save(produto);
        }
    }

    // 🔥 LISTAR MOVIMENTAÇÕES
    public List<MovimentacaoDTO> listarMovimentacoes(Long filialId) {

        List<MovimentacaoDTO> lista = new ArrayList<>();

        List<Entrada> entradas = entradaRepository.findByFilialId(filialId);
        List<Saida> saidas = saidaRepository.findByFilialId(filialId);

        // 🔹 ENTRADAS
        for (Entrada e : entradas) {

            if (e.getProdutoId() == null) continue;

            Produto produto = produtoRepository
                    .findById(e.getProdutoId())
                    .orElse(null);

            lista.add(montarDTOEntrada(e, produto));
        }

        // 🔹 SAÍDAS
        for (Saida s : saidas) {

            if (s.getProdutoId() == null) continue;

            Produto produto = produtoRepository
                    .findById(s.getProdutoId())
                    .orElse(null);

            lista.add(montarDTOSaida(s, produto));
        }

        // 🔥 ordenar por data
        lista.sort((a, b) -> {
            if (a.getData() == null) return 1;
            if (b.getData() == null) return -1;
            return b.getData().compareTo(a.getData());
        });

        return lista;
    }

    // 🔹 DTO ENTRADA
    private MovimentacaoDTO montarDTOEntrada(Entrada e, Produto produto) {

        MovimentacaoDTO dto = new MovimentacaoDTO();

        dto.setTipo("ENTRADA");
        dto.setProdutoId(e.getProdutoId());
        dto.setProdutoNome(
                produto != null && produto.getNome() != null
                        ? produto.getNome()
                        : "Produto removido"
        );
        dto.setQuantidade(e.getQuantidade());
        dto.setData(e.getDataEntrada());

        if (produto != null) {
            dto.setUnidadeMedida(produto.getUnidadeMedida());
        }

        if (e.getFilial() != null) {
            dto.setFilialId(e.getFilial().getId());
            dto.setFilialNome(e.getFilial().getNome());
            dto.setFilialCnpj(e.getFilial().getCnpj());
        }

        return dto;
    }

    // 🔹 DTO SAÍDA
    private MovimentacaoDTO montarDTOSaida(Saida s, Produto produto) {

        MovimentacaoDTO dto = new MovimentacaoDTO();

        dto.setTipo("SAIDA");
        dto.setProdutoId(s.getProdutoId());
        dto.setProdutoNome(
                produto != null && produto.getNome() != null
                        ? produto.getNome()
                        : "Produto removido"
        );
        dto.setQuantidade(s.getQuantidade());
        dto.setData(s.getDataSaida());

        if (produto != null) {
            dto.setUnidadeMedida(produto.getUnidadeMedida());
        }

        if (s.getFilial() != null) {
            dto.setFilialId(s.getFilial().getId());
            dto.setFilialNome(s.getFilial().getNome());
            dto.setFilialCnpj(s.getFilial().getCnpj());
        }

        return dto;
    }
}