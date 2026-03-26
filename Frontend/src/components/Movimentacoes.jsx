import { useEffect, useState } from "react";
import api from "../services/api";

function Movimentacoes() {

  const [movimentacoes, setMovimentacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      const res = await api.get("/movimentacoes");
      setMovimentacoes(res.data);
    } catch (error) {
      console.error("Erro ao carregar movimentações", error);
    } finally {
      setLoading(false);
    }
  }

  // 🔥 FUNÇÃO CERTA (NÃO MUDA O NOME)
  function formatarData(data){

    if(!data) return "-";

    try {
      const d = new Date(data + "Z");

      return isNaN(d.getTime())
        ? "-"
        : d.toLocaleString("pt-BR");

    } catch {
      return "-";
    }

  }

  if(loading){
    return <p>Carregando movimentações...</p>;
  }

  return (

    <div style={{marginTop:"40px"}}>

      <h2>📜 Histórico de Movimentações</h2>

      <table style={{
        width:"100%",
        borderCollapse:"collapse"
      }}>

        <thead style={{background:"#f4f4f4"}}>

          <tr>
            <th>Tipo</th>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Data</th>
          </tr>

        </thead>

        <tbody>

          {movimentacoes.map((mov, index) => (

            <tr key={index}>

              <td>
                {mov.tipo === "ENTRADA" ? "📥 Entrada" : "📤 Saída"}
              </td>

              <td>
                {mov.produtoNome}
              </td>

              <td>
                {mov.quantidade}
              </td>

              <td>
                {formatarData(mov.data)}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default Movimentacoes;