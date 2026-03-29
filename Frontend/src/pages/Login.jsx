import { useState } from "react";
import axios from "axios";

function Login() {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const fazerLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email,
        senha
      });

      const token = response.data.token;

      // salva token
      localStorage.setItem("token", token);

      // redireciona
      window.location.href = "/";

    } catch (error) {
      alert("Login inválido");
    }
  };

  return (
    <div style={{ padding: "50px" }}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Senha"
        onChange={(e) => setSenha(e.target.value)}
      />

      <br /><br />

      <button onClick={fazerLogin}>Entrar</button>
    </div>
  );
}

export default Login;