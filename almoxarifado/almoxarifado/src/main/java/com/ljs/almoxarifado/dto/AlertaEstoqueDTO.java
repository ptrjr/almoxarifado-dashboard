package com.ljs.almoxarifado.dto;

public class AlertaEstoqueDTO {

    private String nome;
    private Integer estoque_atual;
    private Integer estoque_minimo;

    public AlertaEstoqueDTO(String nome, Integer estoque_atual, Integer estoque_minimo) {
        this.nome = nome;
        this.estoque_atual = estoque_atual;
        this.estoque_minimo = estoque_minimo;
    }

    public String getNome() {
        return nome;
    }

    public Integer getEstoque_atual() {
        return estoque_atual;
    }

    public Integer getEstoque_minimo() {
        return estoque_minimo;
    }
}