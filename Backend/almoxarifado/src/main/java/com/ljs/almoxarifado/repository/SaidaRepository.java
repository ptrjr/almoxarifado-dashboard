package com.ljs.almoxarifado.repository;

import com.ljs.almoxarifado.model.Saida;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface SaidaRepository extends JpaRepository<Saida, Long> {

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM saida WHERE produto_id = ?1", nativeQuery = true)
    void deleteByProdutoId(Long produtoId);

    @Query("SELECT s FROM Saida s WHERE (:filialId IS NULL OR s.filial.id = :filialId)")
    List<Saida> findByFilialId(@Param("filialId") Long filialId);

}