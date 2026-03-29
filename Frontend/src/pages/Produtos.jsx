import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"

function Produtos() {

  const [produtos, setProdutos] = useState([])
  const [busca, setBusca] = useState("")
  const navigate = useNavigate()

  // 🔐 verifica login
  const token = localStorage.getItem("token")

  useEffect(() => {
    carregarProdutos()
  }, [])

  async function carregarProdutos() {
    try {
      const response = await api.get("/produtos")
      setProdutos(response.data)
    } catch (error) {
      console.error("Erro ao carregar produtos", error)
    }
  }

  async function excluirProduto(id){

    // 🔒 bloqueio extra
    if(!token){
      alert("Faça login para excluir produtos")
      return
    }

    if(!window.confirm("Deseja excluir este produto?")){
      return
    }

    try{

      await api.delete(`/produtos/${id}`)

      setProdutos(produtos.filter(produto => produto.id !== id))

    }catch(error){

      console.error("Erro ao excluir produto", error)

      if(error.response){
        alert(error.response.data)
      }else{
        alert("Erro ao excluir produto")
      }

    }

  }

  function editarProduto(produto) {

    if(!token){
      alert("Faça login para editar produtos")
      return
    }

    navigate(`/produto/${produto.id}`)

  }

  function novoProduto() {

    if(!token){
      alert("Faça login para criar produtos")
      return
    }

    navigate("/novo-produto")

  }

  const produtosFiltrados = produtos.filter((produto) =>
    (produto.nome || "").toLowerCase().includes(busca.toLowerCase())
  )

  return (

    <div className="main-content">

      <div className="page-header">

        <h1>📦 Produtos</h1>

        {/* 🔐 botão só aparece se estiver logado */}
        {token && (
          <button className="btn-primary" onClick={novoProduto}>
            + Novo Produto
          </button>
        )}

      </div>

      {/* 🔓 aviso modo visitante */}
      {!token && (
        <p style={{ color: "orange", marginBottom: "10px" }}>
          Você está em modo visitante. Faça login para editar.
        </p>
      )}

      <div className="search-box">

        <input
          type="text"
          placeholder="Buscar produto..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

      </div>

      <table className="table">

        <thead>

          <tr>
            <th>Nome</th>
            <th>Estoque atual</th>
            <th>Estoque mínimo</th>
            <th>Categoria</th>
            <th>Ações</th>
          </tr>

        </thead>

        <tbody>

          {produtosFiltrados.map((produto) => {

            const estoqueAtual = produto.estoqueAtual ?? 0
            const estoqueMinimo = produto.estoqueMinimo ?? 0
            const unidade = produto.unidadeMedida ?? ""

            return (

              <tr key={produto.id}>

                <td>{produto.nome}</td>

                <td
                  className={
                    estoqueAtual <= estoqueMinimo
                    ? "estoque-baixo"
                    : ""
                  }
                >
                  {estoqueAtual <= estoqueMinimo && "⚠️ "}
                  {estoqueAtual} {unidade}
                </td>

                <td>{estoqueMinimo}</td>

                <td>{produto.categoria}</td>

                <td>

                  {/* 🔐 só aparece se logado */}
                  {token && (
                    <>
                      <button
                        className="btn-edit"
                        onClick={() => editarProduto(produto)}
                      >
                        ✏️
                      </button>

                      <button
                        className="btn-delete"
                        onClick={() => excluirProduto(produto.id)}
                      >
                        🗑
                      </button>
                    </>
                  )}

                </td>

              </tr>

            )

          })}

        </tbody>

      </table>

    </div>

  )

}

export default Produtos