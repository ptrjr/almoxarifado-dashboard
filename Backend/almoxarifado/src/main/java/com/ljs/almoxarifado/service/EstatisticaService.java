package com.ljs.almoxarifado.service;

import com.ljs.almoxarifado.dto.ProdutoMaisUsadoDTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EstatisticaService {

    public List<ProdutoMaisUsadoDTO> produtosMaisUsados() {
        return new ArrayList<>();
    }

}