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
        setDados(res.data);
      })
      .catch(err => {
        console.error("Erro ao carregar gráfico", err);
      });
  }, []);

  const data = {
    labels: dados.map(d => d.nome), // 🔥 melhor que produto_id
    datasets: [
      {
        label: "Quantidade utilizada",
        data: dados.map(d => d.totalSaida)
      }
    ]
  };

  return (
    <div style={{width:"600px", marginTop:"40px"}}>
      <h2>Produtos mais utilizados</h2>
      <Bar data={data} />
    </div>
  );
}

export default GraficoConsumo;