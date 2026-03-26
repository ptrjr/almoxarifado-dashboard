import { Link, useLocation } from "react-router-dom"

function Sidebar() {

  const location = useLocation()

  function isActive(path) {
    return location.pathname === path ? "active" : ""
  }

  return (
    <div className="sidebar">


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

    </div>
  )
}

export default Sidebar