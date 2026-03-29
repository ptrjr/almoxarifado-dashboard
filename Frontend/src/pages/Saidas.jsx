import SaidaProduto from "../components/SaidaProduto";

function Saidas(){

  return(

    <div>

      <h1>📤Saídas de estoque</h1>

      {!token && (
        <p style={{ color: "orange" }}>
          Você está em modo visitante. Faça login para registrar saídas.
        </p>
      )}

      <SaidaProduto />

    </div>

  )

}

export default Saidas;