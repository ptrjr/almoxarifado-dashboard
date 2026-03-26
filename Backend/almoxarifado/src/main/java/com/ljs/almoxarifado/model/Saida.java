package com.ljs.almoxarifado.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "saida")
public class Saida {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "produto_id")
    private Long produtoId;

    private Integer quantidade;

    private String destino;

    private String responsavel;

    @Column(name = "data_saida")
    private LocalDateTime dataSaida;

    public Saida() {}

    public Long getId() {
        return id;
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

    public String getDestino() {
        return destino;
    }

    public void setDestino(String destino) {
        this.destino = destino;
    }

    public String getResponsavel() {
        return responsavel;
    }

    public void setResponsavel(String responsavel) {
        this.responsavel = responsavel;
    }

    public LocalDateTime getDataSaida() {
        return dataSaida;
    }

    public void setDataSaida(LocalDateTime dataSaida) {
        this.dataSaida = dataSaida;
    }

    @ManyToOne
    @JoinColumn(name = "filial_id")
    private Filial filial;

    public Filial getFilial() { return filial; }
    public void setFilial(Filial filial) { this.filial = filial; }
}