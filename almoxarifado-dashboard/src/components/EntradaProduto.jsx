import { useEffect, useState } from "react"
import api from "../services/api"

function EntradaProduto() {

  const [produtos, setProdutos] = useState([])
  const [filiais, setFiliais] = useState([])

  const [produtoId, setProdutoId] = useState("")
  const [quantidade, setQuantidade] = useState("")
  const [filialId, setFilialId] = useState("")

  useEffect(() => {
    carregarProdutos()
    carregarFiliais()
  }, [])

  async function carregarProdutos() {
    try {
      const response = await api.get("/produtos")
      setProdutos(response.data)
    } catch (error) {
      console.error("Erro ao carregar produtos", error)
    }
  }

  async function carregarFiliais() {
    try {
      const response = await api.get("/filiais")
      setFiliais(response.data)
    } catch (error) {
      console.error("Erro ao carregar filiais", error)
    }
  }

  function formatarData() {
    const now = new Date()
    return now.toISOString().slice(0, 19)
  }

  async function registrarEntrada(e) {

    e.preventDefault()

    if (!produtoId) return alert("Selecione um produto")
    if (!quantidade || quantidade <= 0) return alert("Quantidade inválida")
    if (!filialId) return alert("Selecione a empresa")

    try {

      await api.post("/movimentacoes", {
        tipo: "ENTRADA",
        produtoId: Number(produtoId),
        quantidade: Number(quantidade),
        filialId: Number(filialId),
        data: formatarData()
      })

      alert("Entrada registrada com sucesso!")

      setProdutoId("")
      setQuantidade("")
      setFilialId("")

      window.location.reload()

    } catch (error) {

      console.error(error)
      alert(JSON.stringify(error.response?.data))

    }
  }

  return (

    <div style={{ marginTop: "40px" }}>

      <h2>📥 Registrar Entrada</h2>

      <form onSubmit={registrarEntrada}>

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

        <button type="submit">Registrar</button>

      </form>

    </div>
  )
}

export default EntradaProduto