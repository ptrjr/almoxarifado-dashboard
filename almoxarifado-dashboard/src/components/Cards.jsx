import { useEffect, useState } from "react";
import api from "../services/api";

function Cards() {

  const [totalProdutos, setTotalProdutos] = useState(0);
  const [totalEntradas, setTotalEntradas] = useState(0);
  const [totalSaidas, setTotalSaidas] = useState(0);
  const [estoqueBaixo, setEstoqueBaixo] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {

    try {

      const produtosRes = await api.get("/produtos");
      const entradasRes = await api.get("/entradas");
      const saidasRes = await api.get("/saidas");

      setTotalProdutos(produtosRes.data.length);
      setTotalEntradas(entradasRes.data.length);
      setTotalSaidas(saidasRes.data.length);

      const baixoEstoque = produtosRes.data.filter(produto =>
        produto.estoqueAtual <= produto.estoqueMinimo
      );

      setEstoqueBaixo(baixoEstoque.length);

    } catch (error) {

      console.error("Erro ao carregar dashboard", error);

    } finally {

      setLoading(false);

    }

  }

  if (loading) {
    return <p>Carregando dados...</p>;
  }

  return (

    <div className="cards">

      <div className="card">
        <div className="card-title">📦 Produtos</div>
        <div className="card-value">{totalProdutos}</div>
      </div>

      <div className="card">
        <div className="card-title">📥 Entradas</div>
        <div className="card-value">{totalEntradas}</div>
      </div>

      <div className="card">
        <div className="card-title">📤 Saídas</div>
        <div className="card-value">{totalSaidas}</div>
      </div>

      <div className="card">
        <div className="card-title">⚠ Estoque baixo</div>
        <div className="card-value">{estoqueBaixo}</div>
      </div>

    </div>

  );

}

export default Cards;