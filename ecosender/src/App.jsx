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

//DEV
import Agregar from "./paginas/Agregar";
import Footer from "./components/Footer";
import Administrador from "./paginas/Administrador";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Principal />} />
            <Route path="servicios" element={<Servicios />} />
            <Route path="productos" element={<Productos />} />
            <Route path="inicioSesion" element={<InicioSesion/>}/>
            <Route path="empleados" element={<Empleados/>}/>
            <Route path="cuenta" element={<Cuenta/>}/>
            <Route path="agregar" element={<Agregar/>}/>
            <Route path="administrador" element={<Administrador/>}/>
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
