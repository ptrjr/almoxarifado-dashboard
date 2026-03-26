import Cards from "../components/Cards";
import GraficoConsumo from "../components/GraficoConsumo";
import Alertas from "../components/Alertas";
import Movimentacoes from "../components/Movimentacoes";

function Dashboard() {

  return (

    <div>

      <h1>📊 Dashboard Almoxarifado</h1>

      <Cards />

      <GraficoConsumo />

      <Alertas />

      <Movimentacoes />

    </div>

  );

}

export default Dashboard;