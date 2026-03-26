package com.ljs.almoxarifado.repository;

import com.ljs.almoxarifado.model.Entrada;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface EntradaRepository extends JpaRepository<Entrada, Long> {

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM entradas WHERE produto_id = ?1", nativeQuery = true)
    void deleteByProdutoId(Long produtoId);

    @Query("SELECT e FROM Entrada e WHERE (:filialId IS NULL OR e.filial.id = :filialId)")
    List<Entrada> findByFilialId(@Param("filialId") Long filialId);

}