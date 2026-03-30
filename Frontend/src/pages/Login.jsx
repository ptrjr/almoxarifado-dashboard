import { useState } from "react";
import api from "../services/api";

function Login() {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const fazerLogin = async () => {
    try {
      const response = await api.post("/auth/login", {
        email,
        senha
      });

      const token = response.data.token;

      // salva token
      localStorage.setItem("token", token);

      // redireciona
      window.location.href = "/";

    } catch (error) {
      console.error(error);
      alert("Login inválido");
    }
  };

  return (
    <div style={{ padding: "50px" }}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <br /><br />

      <button onClick={fazerLogin}>
        Entrar
      </button>
    </div>
  );
}

export default Login;