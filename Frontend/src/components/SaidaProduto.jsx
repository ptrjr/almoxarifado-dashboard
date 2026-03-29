import { useEffect, useState } from "react";
import api from "../services/api";

function SaidaProduto() {

  const [produtos, setProdutos] = useState([]);
  const [filiais, setFiliais] = useState([]);

  const [produtoId, setProdutoId] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [filialId, setFilialId] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    carregarProdutos();
    carregarFiliais();
  }, []);

  async function carregarProdutos() {
    try {
      const res = await api.get("/produtos");
      setProdutos(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function carregarFiliais() {
    try {
      const res = await api.get("/filiais");
      setFiliais(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  function formatarData() {
    const now = new Date()
    return now.toISOString().slice(0, 19)
  }

  async function registrarSaida(e) {

    e.preventDefault();

    // 🔐 BLOQUEIO FRONT
    if (!token) {
      alert("Faça login para registrar saídas");
      return;
    }

    if (!produtoId) return alert("Selecione um produto");
    if (!quantidade || quantidade <= 0) return alert("Quantidade inválida");
    if (!filialId) return alert("Selecione a empresa");

    try {

      await api.post("/movimentacoes", {
        tipo: "SAIDA",
        produtoId: Number(produtoId),
        quantidade: Number(quantidade),
        filialId: Number(filialId),
        data: formatarData()
      });

      alert("Saída registrada com sucesso!");

      setProdutoId("");
      setQuantidade("");
      setFilialId("");

      window.location.reload()

    } catch (error) {

      console.error(error);
      alert("Erro ao registrar saída");

    }
  }

  return (

    <div style={{ marginTop: "40px" }}>

      <form onSubmit={registrarSaida}>

        <label>Produto</label><br />
        <select value={produtoId} onChange={(e) => setProdutoId(e.target.value)}>
          <option value="">Selecione um produto</option>
          {produtos.map(p => (
            <option key={p.id} value={p.id}>{p.nome}</option>
          ))}
        </select>

        <br /><br />

        <label>Quantidade</label><br />
        <input
          type="number"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
        />

        <br /><br />

        <label>Empresa (CNPJ)</label><br />
        <select value={filialId} onChange={(e) => setFilialId(e.target.value)}>
          <option value="">Selecione a empresa</option>
          {filiais.map(f => (
            <option key={f.id} value={f.id}>{f.nome}</option>
          ))}
        </select>

        <br /><br />

        {/* 🔐 botão só aparece logado */}
        {token && (
          <button type="submit">Registrar</button>
        )}

      </form>

    </div>
  );
}

export default SaidaProduto;