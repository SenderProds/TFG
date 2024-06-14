import { useEffect, useState } from "react";
import { comprobarGoogleId, comprobarJWT } from "../utilidades/sesion";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { LiaBoxSolid } from "react-icons/lia";
import { CiLogout } from "react-icons/ci";
import { FiChevronsRight } from "../components/Iconos";

import InstalacionesUsuario from "../components/cuenta/InstalacionesUsuario";
import CuentaUsuario from "../components/cuenta/CuentaUsuario";
import PedidosUsuario from "../components/cuenta/PedidosUsuario";

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
    } else if (googleId) {
      const comprobarGoId = async () => {
        try {
          let respuesta = await comprobarGoogleId(googleId);
          setIdUsuario(respuesta);
          console.log(respuesta);
          setEstaLogeado(respuesta !== "false");
        } catch (error) {
          console.error(error);
        }
      };

      comprobarGoId();
    } else {
      redirigirIniciarSesion();
    }

    //setEstaLogeado(loggingStatus === "true");
    console.log(estaLogeado);
  }, [localStorage.getItem("sesion")]);

  const cerrarSesion = () => {
    if (localStorage.getItem("sesion")) {
      localStorage.removeItem("sesion");
      window.location.reload();
    } else if (localStorage.getItem("googleId")) {
      localStorage.removeItem("googleId");
      window.location.reload();
    }
  };

  /**
   * Si no esta logeado redirige al login
   */
  const redirigirIniciarSesion = () => {
    console.log(estaLogeado);
    if (estaLogeado === false) {
      navigate("/inicioSesion");
    }
  };

  return (
    <>
      {estaLogeado ? (
        <div className="">
          <div className="flex justify-center">
            <div className="flex w-full ">
              <div className="fixed left-0 p-2 bg-color1 shadow-xl rounded-r-3xl z-20 mt-3 text-xl text-white sm:hidden">
                <FiChevronsRight />
              </div>
              <div
                id="menuLateral"
                className="w-1/6 h-screen flex flex-col border border-2 border-t-0 border-b-0 hidden md:block pr-2"
              >
                <button
                  className="w-full flex items-center justify-start pl-9 p-4 rounded-r-full bg-slate-300 mt-2 "
                  onClick={() => setComponenteActivo("Pedidos")}
                >
                  <LiaBoxSolid /> Pedidos{" "}
                </button>
                <button
                  className="w-full flex items-center justify-start pl-9 p-4 rounded-r-full bg-slate-300 mt-2"
                  onClick={() => setComponenteActivo("Instalaciones")}
                >
                  <FaUser /> Instalaciones
                </button>
                <button
                  className="w-full flex items-center justify-start pl-9 p-4 rounded-r-full bg-slate-300 mt-2"
                  onClick={() => setComponenteActivo("Cuenta")}
                >
                  <FaUser /> Cuenta
                </button>

                <button
                  className="w-full flex items-center justify-start pl-9 p-4 rounded-r-full bg-slate-300 mt-2"
                  onClick={() => cerrarSesion()}
                >
                  <CiLogout /> Cerrar Sesion
                </button>
              </div>

              <div
                id="contenido"
                className="w-full md:w-5/6 h-screen bg-slate-200 overflow-y-scroll "
              >
                {componenteRenderizado()}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>No esta logeado</>
      )}
    </>
  );
};

export default Cuenta;
