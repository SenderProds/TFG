import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NoPage from "./components/NoPage";
import Header from "./components/Header";
import Principal from "./paginas/Principal";
import Servicios from "./paginas/Servicios";
import InicioSesion from "./paginas/InicioSesion";
import Productos from "./paginas/Productos";
import Empleados from "./paginas/Empleados";
import Cuenta from "./paginas/Cuenta";
import Carrito from "./paginas/Carrito";
import Checkout from "./paginas/Checkout";
import Footer from "./components/Footer";
import Chat from "./paginas/Chat";
import SolicitarServicio from "./paginas/SolicitarServicio";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Principal />} />
            <Route path="servicios" element={<Servicios />} />
            <Route path="productos" element={<Productos />} />
            <Route path="inicioSesion" element={<InicioSesion />} />
            <Route path="empleados" element={<Empleados />} />
            <Route path="cuenta" element={<Cuenta />} />
            <Route path="carrito" element={<Carrito />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="chat" element={<Chat />} />
            <Route path="solicitarServicio" element={<SolicitarServicio />} />


            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
