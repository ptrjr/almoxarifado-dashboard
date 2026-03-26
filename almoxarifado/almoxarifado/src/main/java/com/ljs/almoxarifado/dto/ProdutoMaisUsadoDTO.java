package com.ljs.almoxarifado.dto;

public class ProdutoMaisUsadoDTO {

    private Long produtoId;
    private Integer quantidade;

    public ProdutoMaisUsadoDTO() {
    }

    public ProdutoMaisUsadoDTO(Long produtoId, Integer quantidade) {
        this.produtoId = produtoId;
        this.quantidade = quantidade;
    }

    public Long getProdutoId() {
        return produtoId;
    }

    public void setProdutoId(Long produtoId) {
        this.produtoId = produtoId;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }
}