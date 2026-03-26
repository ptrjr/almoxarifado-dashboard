import { useEffect, useState } from "react"
import api from "../services/api"
import "./Relatorios.css"

function Relatorios() {

  const [movimentacoes, setMovimentacoes] = useState([])
  const [filiais, setFiliais] = useState([])
  const [filialId, setFilialId] = useState("")

  // 🔹 carregar filiais
  useEffect(() => {
    api.get("/filiais")
      .then(res => setFiliais(res.data))
  }, [])

  // 🔹 buscar movimentações
  const buscarMovimentacoes = () => {
    let url = "/movimentacoes"

    if (filialId) {
      url += `?filialId=${filialId}`
    }

    api.get(url)
      .then(res => setMovimentacoes(res.data))
  }

  // 🔹 carregar ao abrir
  useEffect(() => {
    buscarMovimentacoes()
  }, [])

  return (
    <div className="relatorios-container">

      <h1>Relatórios</h1>

      {/* 🔎 FILTROS */}
      <div className="filtros-container">

        <select
          value={filialId}
          onChange={(e) => setFilialId(e.target.value)}
        >
          <option value="">Todas empresas</option>
          {filiais.map(f => (
            <option key={f.id} value={f.id}>
              {f.nome}
            </option>
          ))}
        </select>

        <div className="botoes">
          <button onClick={buscarMovimentacoes}>
            Buscar
          </button>

          <button onClick={() => window.print()}>
            Imprimir
          </button>
        </div>

      </div>

      {/* 📊 TABELA */}
      <table className="tabela-relatorios">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Unidade</th>
            <th>Empresa</th>
            <th>CNPJ</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {movimentacoes.map((m, i) => (
            <tr key={i}>
              <td>{m.tipo}</td>
              <td>{m.produtoNome}</td>
              <td>{m.quantidade}</td>
              <td>{m.unidadeMedida || "-"}</td>
              <td>{m.filialNome}</td>
              <td>{m.filialCnpj}</td>
              <td>{new Date(m.data).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default Relatorios