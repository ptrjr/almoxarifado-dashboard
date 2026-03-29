import { useEffect, useState } from "react";

import Cards from "../components/Cards";
import GraficoConsumo from "../components/GraficoConsumo";
import Alertas from "../components/Alertas";
import Movimentacoes from "../components/Movimentacoes";

function Dashboard() {

  const [logado, setLogado] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setLogado(true);
    }
  }, []);

  return (
    <div>

      <h1>📊 Dashboard Almoxarifado</h1>

      {!logado && (
        <p style={{ color: "orange", marginBottom: "10px" }}>
          Você está em modo visitante. Faça login para editar.
        </p>
      )}

      <Cards />

      <GraficoConsumo />

      <Alertas />

      <Movimentacoes />

    </div>
  );
}

export default Dashboard;