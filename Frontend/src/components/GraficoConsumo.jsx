import { useEffect, useState } from "react";
import api from "../services/api";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement);

function GraficoConsumo() {

  const [dados, setDados] = useState([]);

  useEffect(() => {
    api.get("/estatisticas/mais-usados")
      .then(res => {
        console.log("dados grafico:", res.data); // debug
        setDados(res.data);
      })
      .catch(err => {
        console.error("Erro ao carregar gráfico", err);
        setDados([]); // evita quebrar
      });
  }, []);

  // 🔥 proteção contra erro
  const lista = Array.isArray(dados) ? dados : [];

  const data = {
    labels: lista.map(d => d.nome),
    datasets: [
      {
        label: "Quantidade utilizada",
        data: lista.map(d => d.totalSaida)
      }
    ]
  };

  return (
    <div style={{ width: "600px", marginTop: "40px" }}>
      <h2>Produtos mais utilizados</h2>
      <Bar data={data} />
    </div>
  );
}

export default GraficoConsumo;