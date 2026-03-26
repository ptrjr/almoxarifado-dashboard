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

      console.log("produtos:", produtosRes.data); // debug

      // 🔥 proteção total
      const produtos = Array.isArray(produtosRes.data) ? produtosRes.data : [];
      const entradas = Array.isArray(entradasRes.data) ? entradasRes.data : [];
      const saidas = Array.isArray(saidasRes.data) ? saidasRes.data : [];

      setTotalProdutos(produtos.length);
      setTotalEntradas(entradas.length);
      setTotalSaidas(saidas.length);

      const baixoEstoque = produtos.filter(produto =>
        (produto.estoqueAtual ?? 0) <= (produto.estoqueMinimo ?? 0)
      );

      setEstoqueBaixo(baixoEstoque.length);

    } catch (error) {

      console.error("Erro ao carregar dashboard", error);

      // fallback
      setTotalProdutos(0);
      setTotalEntradas(0);
      setTotalSaidas(0);
      setEstoqueBaixo(0);

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