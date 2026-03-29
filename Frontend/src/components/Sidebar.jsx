import { Link, useLocation, useNavigate } from "react-router-dom"

function Sidebar() {

  const location = useLocation()
  const navigate = useNavigate()

  const token = localStorage.getItem("token")

  function isActive(path) {
    return location.pathname === path ? "active" : ""
  }

  function logout() {
    localStorage.removeItem("token")
    navigate("/login")
  }

  function login() {
    navigate("/login")
  }

  return (
    <div className="sidebar">

      {/* 🔰 TÍTULO */}
      <h2 style={{ padding: "10px" }}>📦 Almoxarifado</h2>

      {/* 🔐 STATUS */}
      <div style={{ padding: "10px", fontSize: "14px" }}>
        {token ? (
          <span style={{ color: "green" }}>🟢 Logado</span>
        ) : (
          <span style={{ color: "orange" }}>🟡 Visitante</span>
        )}
      </div>

      {/* 📂 MENU */}
      <nav>

        <Link className={isActive("/")} to="/">
          Dashboard
        </Link>

        <Link className={isActive("/produtos")} to="/produtos">
          Produtos
        </Link>

        <Link className={isActive("/entradas")} to="/entradas">
          Entradas
        </Link>

        <Link className={isActive("/saidas")} to="/saidas">
          Saídas
        </Link>

        <Link className={isActive("/relatorios")} to="/relatorios">
          Relatórios
        </Link>

      </nav>

      {/* 🔑 LOGIN / LOGOUT */}
      <div style={{ marginTop: "20px", padding: "10px" }}>

        {token ? (
          <button onClick={logout} className="btn-logout">
            Sair
          </button>
        ) : (
          <button onClick={login} className="btn-login">
            Login
          </button>
        )}

      </div>

    </div>
  )
}

export default Sidebar