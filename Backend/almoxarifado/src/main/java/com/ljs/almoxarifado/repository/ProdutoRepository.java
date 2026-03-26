package com.ljs.almoxarifado.repository;

import com.ljs.almoxarifado.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    @Query("SELECT p FROM Produto p WHERE p.estoqueAtual <= p.estoqueMinimo")
    List<Produto> buscarEstoqueBaixo();

}

