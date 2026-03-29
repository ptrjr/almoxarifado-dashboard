import EntradaProduto from "../components/EntradaProduto";

function Entradas(){

  const token = localStorage.getItem("token");

  return(

    <div>

      <h1>📥 Entradas de estoque</h1>

      {/* 🔐 aviso visitante */}
      {!token && (
        <p style={{ color: "orange" }}>
          Você está em modo visitante. Faça login para registrar entradas.
        </p>
      )}

      <EntradaProduto />

    </div>

  )

}

export default Entradas;