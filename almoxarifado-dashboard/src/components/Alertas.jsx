import { useEffect, useState } from "react";
import api from "../services/api";

function Alertas() {

  const [alertas, setAlertas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarAlertas();
  }, []);

  async function carregarAlertas() {

    try {

      const res = await api.get("/alertas");

      setAlertas(res.data);

    } catch (error) {

      console.error("Erro ao carregar alertas", error);

    } finally {

      setLoading(false);

    }

  }

  if (loading) {
    return <p>Carregando alertas...</p>;
  }

  if (alertas.length === 0) {
    return <p>✅ Nenhum produto com estoque baixo</p>;
  }

  return (

    <div style={{ marginTop: "30px" }}>

      <h2>⚠ Produtos com estoque baixo</h2>

      <ul>

        {alertas.map((produto) => (

          <li key={produto.nome}> {/* 🔥 CORRIGIDO */}

            ⚠ <strong>{produto.nome}</strong> — estoque: {produto.estoqueAtual}

          </li>

        ))}

      </ul>

    </div>

  );

}

export default Alertas;