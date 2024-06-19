import { useEffect, useState } from "react";
import { comprobarGoogleId, comprobarJWT } from "../utilidades/sesion";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { LiaBoxSolid } from "react-icons/lia";
import { CiLogout } from "react-icons/ci";
import { FiChevronsRight } from "../components/Iconos";
import { FiChevronsLeft } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

import InstalacionesUsuario from "../components/cuenta/InstalacionesUsuario";
import CuentaUsuario from "../components/cuenta/CuentaUsuario";
import PedidosUsuario from "../components/cuenta/PedidosUsuario";

const Cuenta = () => {
  const navigate = useNavigate();
  const [componenteActivo, setComponenteActivo] = useState("Cuenta");
  const [estaLogeado, setEstaLogeado] = useState(false);
  const [idUsuario, setIdUsuario] = useState();
  const [desplegarMenu, setDesplegarMenu] = useState(false);
  const [ocultarMenu, setOcultarMenu] = useState(true);

  const componenteRenderizado = () => {
    switch (componenteActivo) {
      case "Cuenta":
        return <CuentaUsuario />;
      case "Instalaciones":
        return <InstalacionesUsuario />;
      case "Pedidos":
        return <PedidosUsuario />;
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

          setEstaLogeado(respuesta !== "false");
        } catch (error) {
          alert("Se ha producido un error: " + error);
        }
      };

      comprobarGoId();
    } else {
      redirigirIniciarSesion();
    }


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

    if (estaLogeado === false) {
      navigate("/inicioSesion");
    }
  };

  const despliegaMenu = () => {
    setOcultarMenu(false);

    setTimeout(() => {
      setDesplegarMenu(true);
    }, 100);
  };

  /**
   * Oculta el menu primero desplegando el menu
   * A los cien milisegundos lo oculta para que de tiempo a la transicion
   *
   */
  const ocultaMenu = () => {
    setDesplegarMenu(false);

    setTimeout(() => {
      setOcultarMenu(true);
    }, 100);
  };

  return (
    <>
      {estaLogeado ? (
        <div className="">
          <div className="flex justify-center">
            <div className="flex w-full ">
              {/*Boton para desplegar menu de movil */}
              <div
                className={`fixed cursor-pointer left-0 p-2 bg-color1 shadow-xl rounded-r-3xl z-20 mt-3 text-3xl text-white md:hidden ${
                  desplegarMenu ? "hidden" : "block"
                } transition ease-in-out duration-200`}
                onClick={() => despliegaMenu()}
              >
                <FiChevronsRight />
              </div>

              {/*Boton para ocultar menu de movil */}
              <div
                className={`fixed cursor-pointer left-0 p-2 bg-color1 shadow-xl rounded-r-3xl z-20 mt-3 text-3xl text-white md:hidden ${
                  desplegarMenu ? "block" : "hidden"
                } transition ease-in-out duration-200`}
                onClick={() => ocultaMenu()}
              >
                <FiChevronsLeft className="" />
              </div>

              <div
                id="menuLateral"
                className={`${
                  desplegarMenu ? "translate-x-0" : "-translate-x-full"
                } ${
                  ocultarMenu ? "hidden" : "fixed"
                } bg-white w-full h-full p-12 md:static md:p-0 md:w-1/6 md:translate-x-0 md:h-screen md:flex md:flex-col md:border md:border-2 md:border-t-0 md:border-b-0 md:block md:pr-2 transition-transform duration-200 ease-in-out z-10`}
              >
                <button
                  className="w-full flex items-center justify-start pl-9 p-4 md:rounded-r-full bg-slate-300 mt-2"
                  onClick={() => {
                    setComponenteActivo("Cuenta");
                    ocultaMenu();
                  }}
                >
                  <FaUser /> Cuenta
                </button>
                <button
                  className="w-full flex items-center justify-start pl-9 p-4 md:rounded-r-full bg-slate-300 mt-2 "
                  onClick={() => {
                    setComponenteActivo("Pedidos");
                    ocultaMenu();
                  }}
                >
                  <LiaBoxSolid /> Pedidos{" "}
                </button>
                <button
                  className="w-full flex items-center justify-start pl-9 p-4 md:rounded-r-full bg-slate-300 mt-2"
                  onClick={() => {
                    setComponenteActivo("Instalaciones");
                    ocultaMenu();
                  }}
                >
                  <FaUser /> Instalaciones
                </button>

                <button
                  className="w-full flex items-center justify-start pl-9 p-4 md:rounded-r-full bg-slate-300 mt-2"
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
