package com.ljs.almoxarifado.dto;

public class ProdutoMaisUsadoDTO {

    private String nome;
    private Integer quantidade;

    public ProdutoMaisUsadoDTO() {}

    public ProdutoMaisUsadoDTO(String nome, Integer quantidade) {
        this.nome = nome;
        this.quantidade = quantidade;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }
}