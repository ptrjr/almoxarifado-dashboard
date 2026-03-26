import Sidebar from "./components/Sidebar"
import { Routes, Route } from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import Produtos from "./pages/Produtos"
import Entradas from "./pages/Entradas"
import Saidas from "./pages/Saidas"
import Relatorios from "./pages/Relatorios"
import NovoProduto from "./components/NovoProduto"
import EditarProduto from "./components/EditarProduto"

function App(){

  return(

    <div className="app-layout">

      <Sidebar/>

      <div className="main-content">

        <Routes>

          <Route path="/" element={<Dashboard/>} />

          <Route path="/produtos" element={<Produtos/>} />

          <Route path="/entradas" element={<Entradas/>} />

          <Route path="/saidas" element={<Saidas/>} />

          <Route path="/relatorios" element={<Relatorios/>} />

          <Route path="/novo-produto" element={<NovoProduto/>} />

          <Route path="/produto/:id" element={<EditarProduto/>} />

        </Routes>

      </div>

    </div>

  )

}

export default App