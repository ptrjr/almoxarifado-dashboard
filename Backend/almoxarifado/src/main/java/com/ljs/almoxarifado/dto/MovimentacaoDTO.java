package com.ljs.almoxarifado.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;

public class MovimentacaoDTO {

    private String tipo;
    private Long produtoId;
    private String produtoNome;
    private Integer quantidade;

    // 🔥 FILIAL / EMPRESA
    private Long filialId;
    private String filialNome;
    private String filialCnpj;

    // 🔥 NOVOS CAMPOS
    private String unidadeMedida;
    private String empresaNome;
    private String empresaCnpj;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime data;

    public MovimentacaoDTO() {}

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public Long getProdutoId() { return produtoId; }
    public void setProdutoId(Long produtoId) { this.produtoId = produtoId; }

    public String getProdutoNome() { return produtoNome; }
    public void setProdutoNome(String produtoNome) { this.produtoNome = produtoNome; }

    public Integer getQuantidade() { return quantidade; }
    public void setQuantidade(Integer quantidade) { this.quantidade = quantidade; }

    public Long getFilialId() { return filialId; }
    public void setFilialId(Long filialId) { this.filialId = filialId; }

    public String getFilialNome() { return filialNome; }
    public void setFilialNome(String filialNome) { this.filialNome = filialNome; }

    public String getFilialCnpj() { return filialCnpj; }
    public void setFilialCnpj(String filialCnpj) { this.filialCnpj = filialCnpj; }

    public String getUnidadeMedida() { return unidadeMedida; }
    public void setUnidadeMedida(String unidadeMedida) { this.unidadeMedida = unidadeMedida; }

    public String getEmpresaNome() { return empresaNome; }
    public void setEmpresaNome(String empresaNome) { this.empresaNome = empresaNome; }

    public String getEmpresaCnpj() { return empresaCnpj; }
    public void setEmpresaCnpj(String empresaCnpj) { this.empresaCnpj = empresaCnpj; }

    public LocalDateTime getData() { return data; }
    public void setData(LocalDateTime data) { this.data = data; }
}