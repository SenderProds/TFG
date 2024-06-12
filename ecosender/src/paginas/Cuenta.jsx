import { useEffect, useState } from "react";
import { comprobarGoogleId, comprobarJWT } from "../utilidades/sesion";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { LiaBoxSolid } from "react-icons/lia";
import { CiLogout } from "react-icons/ci";

import PedidosUsuario from "./cuenta/PedidosUsuario";
import InstalacionesUsuario from "./cuenta/InstalacionesUsuario";
import CuentaUsuario from "./cuenta/CuentaUsuario";

const Cuenta = () => {
  const navigate = useNavigate();
  const [componenteActivo, setComponenteActivo] = useState("Pedidos");
  const [estaLogeado, setEstaLogeado] = useState(false);
  const [idUsuario, setIdUsuario] = useState();

  const componenteRenderizado = () => {
    switch (componenteActivo) {
      case "Cuenta":
        return <CuentaUsuario />;
      case "Instalaciones":
        return <InstalacionesUsuario />;
      case "Pedidos":
        return <PedidosUsuario id={idUsuario} />;
    }
  };
  useEffect(() => {
    const loggingStatus = localStorage.getItem("sesion");
    const googleId = localStorage.getItem("googleId");

    if (loggingStatus) {
      const checkJWT = async () => {
        try {
          let respuesta = await comprobarJWT(loggingStatus);
          setIdUsuario(respuesta);

          // Aquí puedes manejar la respuesta para actualizar el estado de `estaLogeado` según sea necesario
          setEstaLogeado(respuesta !== "false"); // Ajusta esta lógica según la respuesta real que obtienes
        } catch (error) {
          console.error("Error comprobando el JWT:", error);
        }
      };

      checkJWT();
    }

    if (googleId) {
      const comprobarGoId = async () => {
        try {
          let respuesta = await comprobarGoogleId(googleId);

          setEstaLogeado(respuesta === "true");
        } catch (error) {
          console.error(error);
        }
      };

      comprobarGoId();
    }

    //setEstaLogeado(loggingStatus === "true");
    console.log(estaLogeado);
  }, [localStorage.getItem('sesion')]);


  const cerrarSesion = () => {
    if(localStorage.getItem('sesion')){
      localStorage.removeItem('sesion');
      window.location.reload();
    }else if(localStorage.getItem('googleId')){
      localStorage.removeItem('googleId');
      window.location.reload();
    }
  }

  
  return (
    <>
      {estaLogeado ? (
        <div className="h-screen">
          <div className="flex justify-center">
            <>
              <div className="flex w-full">
                <div
                  id="menuLateral"
                  className="w-1/6 h-screen flex flex-col border border-2 border-t-0 border-b-0"
                >
                  <button
                    className="w-5/6 flex items-center justify-start pl-9 p-4 rounded-r-full bg-slate-300 mt-2"
                    onClick={() => setComponenteActivo("Pedidos")}
                  >
                    <LiaBoxSolid /> Pedidos{" "}
                  </button>
                  <button
                    className="w-5/6 flex items-center justify-start pl-9 p-4 rounded-r-full bg-slate-300 mt-2"
                    onClick={() => setComponenteActivo("Instalaciones")}
                  >
                    <FaUser /> Instalaciones
                  </button>
                  <button
                    className="w-5/6 flex items-center justify-start pl-9 p-4 rounded-r-full bg-slate-300 mt-2"
                    onClick={() => setComponenteActivo("Cuenta")}
                  >
                    <FaUser /> Cuenta
                  </button>

                  <button
                    className="w-5/6 flex items-center justify-start pl-9 p-4 rounded-r-full bg-slate-300 mt-2"
                    onClick={() => cerrarSesion()}
                  >
                    <CiLogout /> Cerrar Sesion
                  </button>
                </div>

                <div
                  id="contenido"
                  className="w-5/6 h-screen bg-slate-200 overflow-y-scroll"
                >
                  {componenteRenderizado()}
                </div>
              </div>
            </>
          </div>
        </div>
      ) : (
        <>No esta logeado</>
      )}
    </>
  );
};

export default Cuenta;
