import Sidebar from "./components/Sidebar"
import { Routes, Route, Navigate } from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import Produtos from "./pages/Produtos"
import Entradas from "./pages/Entradas"
import Saidas from "./pages/Saidas"
import Relatorios from "./pages/Relatorios"
import NovoProduto from "./components/NovoProduto"
import EditarProduto from "./components/EditarProduto"
import Login from "./pages/Login"

// 🔐 função para verificar login
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token")

  if (!token) {
    return <Navigate to="/login" />
  }

  return children
}

function App() {

  return (

    <div className="app-layout">

      <Sidebar />

      <div className="main-content">

        <Routes>

          {/* 🔓 rota pública */}
          <Route path="/login" element={<Login />} />

          {/* 🔓 VISUALIZAÇÃO LIBERADA */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/entradas" element={<Entradas />} />
          <Route path="/saidas" element={<Saidas />} />
          <Route path="/relatorios" element={<Relatorios />} />

          {/* 🔒 ROTAS PROTEGIDAS */}
          <Route
            path="/novo-produto"
            element={
              <PrivateRoute>
                <NovoProduto />
              </PrivateRoute>
            }
          />

          <Route
            path="/produto/:id"
            element={
              <PrivateRoute>
                <EditarProduto />
              </PrivateRoute>
            }
          />

        </Routes>

      </div>

    </div>

  )
}

export default App