import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../services/api"

function EditarProduto(){

  const { id } = useParams()
  const navigate = useNavigate()

  const [nome, setNome] = useState("")
  const [categoria, setCategoria] = useState("")
  const [estoqueAtual, setEstoqueAtual] = useState(0)
  const [estoqueMinimo, setEstoqueMinimo] = useState(0)

  // 🔐 verifica login
  const token = localStorage.getItem("token")

  useEffect(() => {

    // 🔒 bloqueia acesso direto pela URL
    if(!token){
      alert("Faça login para editar produtos")
      navigate("/login")
      return
    }

    carregarProduto()

  }, [])

  async function carregarProduto(){

    try{

      const res = await api.get("/produtos")

      const produto = res.data.find(p => p.id == id)

      if(produto){
        setNome(produto.nome || "")
        setCategoria(produto.categoria || "")
        setEstoqueAtual(produto.estoqueAtual ?? 0)
        setEstoqueMinimo(produto.estoqueMinimo ?? 0)
      }

    }catch(error){
      console.error("Erro ao carregar produto", error)
    }

  }

  async function salvarProduto(e){

    e.preventDefault()

    // 🔒 proteção extra
    if(!token){
      alert("Faça login para salvar alterações")
      return
    }

    try{

      await api.put(`/produtos/${id}`, {
        nome: nome,
        categoria: categoria,
        estoqueAtual: estoqueAtual,
        estoqueMinimo: estoqueMinimo
      })

      alert("Produto atualizado!")

      navigate("/produtos")

    }catch(error){
      console.error("Erro ao atualizar produto", error)
    }

  }

  return(

    <div>

      <h2>Editar Produto</h2>

      {/* 🔓 aviso visual */}
      {!token && (
        <p style={{ color: "orange" }}>
          Você está em modo visitante
        </p>
      )}

      <form onSubmit={salvarProduto} className="form-container">

        <div className="form-group">
          <label>Nome</label>
          <input
            value={nome}
            onChange={(e)=>setNome(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Categoria</label>

          <select
            value={categoria}
            onChange={(e)=>setCategoria(e.target.value)}
          >
            <option value="">Selecione</option>
            <option value="Obras">Obras</option>
            <option value="Irrigação">Irrigação</option>
            <option value="Produção">Produção</option>
          </select>

        </div>

        <div className="form-group">
          <label>Estoque Atual</label>

          <input
            type="number"
            value={estoqueAtual}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Estoque Mínimo</label>

          <input
            type="number"
            value={estoqueMinimo}
            disabled
          />
        </div>

        <button className="btn-primary">
          Salvar
        </button>

      </form>

    </div>

  )

}

export default EditarProduto