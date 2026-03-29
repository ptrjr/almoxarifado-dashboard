import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"

function NovoProduto(){

  const navigate = useNavigate()

  const [nome, setNome] = useState("")
  const [categoria, setCategoria] = useState("")
  const [unidadeMedida, setUnidadeMedida] = useState("")
  const [estoqueAtual, setEstoqueAtual] = useState("")
  const [estoqueMinimo, setEstoqueMinimo] = useState("")

  const token = localStorage.getItem("token")

  useEffect(() => {
    if(!token){
      alert("Faça login para criar produtos")
      navigate("/login")
    }
  }, [])

  async function salvarProduto(e){

    e.preventDefault()

    if(!token){
      alert("Faça login para salvar")
      return
    }

    try{

      await api.post("/produtos",{
        nome,
        categoria,
        unidadeMedida,
        estoqueAtual: Number(estoqueAtual),
        estoqueMinimo: Number(estoqueMinimo)
      })

      alert("Produto criado com sucesso!")
      navigate("/produtos")

    }catch(error){
      console.error("Erro ao salvar produto", error)
    }

  }

  return(

    <div>

      <h2>Novo Produto</h2>

      {!token && (
        <p style={{ color: "orange" }}>
          Você está em modo visitante
        </p>
      )}

      <form onSubmit={salvarProduto} className="form-container">

        {/* campos iguais */}

        <div className="form-group">
          <label>Nome</label>
          <input value={nome} onChange={(e)=>setNome(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Categoria</label>
          <select value={categoria} onChange={(e)=>setCategoria(e.target.value)} required>
            <option value="">Selecione</option>
            <option value="Obras">Obras</option>
            <option value="Irrigação">Irrigação</option>
            <option value="Produção">Produção</option>
          </select>
        </div>

        <div className="form-group">
          <label>Unidade de Medida</label>
          <select value={unidadeMedida} onChange={(e)=>setUnidadeMedida(e.target.value)} required>
            <option value="">Selecione</option>
            <option value="Caixa">Caixa</option>
            <option value="Fardo">Fardo</option>
            <option value="Grama">Grama</option>
            <option value="Litro">Litro</option>
            <option value="Metro">Metro</option>
            <option value="Metro cúbico">Metro cúbico</option>
            <option value="Metro quadrado">Metro quadrado</option>
            <option value="Milímetro">Milímetro</option>
            <option value="Peça">Peça</option>
            <option value="Polegada">Polegada</option>
            <option value="Quilograma">Quilograma</option>
            <option value="Unidade">Unidade</option>
          </select>
        </div>

        <div className="form-group">
          <label>Estoque Atual</label>
          <input type="number" value={estoqueAtual} onChange={(e)=>setEstoqueAtual(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Estoque Mínimo</label>
          <input type="number" value={estoqueMinimo} onChange={(e)=>setEstoqueMinimo(e.target.value)} required />
        </div>

        {/* 🔐 botão só aparece logado */}
        {token && (
          <button type="submit" className="btn-primary">
            Salvar Produto
          </button>
        )}

      </form>

    </div>

  )

}

export default NovoProduto