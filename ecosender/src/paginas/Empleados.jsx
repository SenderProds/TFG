import { useEffect, useState } from "react";
import {
  comprobarEmpleado,
  comprobarJWTEmpleado,
  obtenerRangoEmpleado,
} from "../utilidades/empleados";
import {
  GrUserWorker,
  FaUser,
  LiaBoxSolid,
  ImStatsDots,
  RiCustomerService2Fill,
  FaRegEnvelope,
  FiChevronsRight,
} from "../components/Iconos";

//Importaciones Panel Empleados
import PanelEmpleados from "./empleados/PanelEmpleados";
import PanelClientes from "./empleados/PanelClientes";
import PanelPedidos from "./empleados/PanelPedidos";
import PanelIngresos from "./empleados/PanelIngresos";
import PanelAtencionAlCliente from "./empleados/PanelAtencionAlCliente";
import PanelSolicitudes from "./empleados/PanelSolicitudes";
import PanelProductos from "./empleados/PanelProductos";

import { FiChevronsLeft } from "react-icons/fi";
import { LiaSolarPanelSolid } from "react-icons/lia";


const Empleados = () => {
  const [componenteActivo, setComponenteActivo] = useState("Empleados");
  const [estaLogeado, setEstaLogeado] = useState(false);
  const [rangoEmpleado, setRangoEmpleado] = useState();
  const [desplegarMenu, setDeplegarMenu] = useState(false);
  const [ocultarMenuMovil, setOcultarMenuMovil] = useState(true);

  const componenteRenderizado = () => {
    switch (componenteActivo) {
      case "Empleados":
        return <PanelEmpleados />;
      case "Clientes":
        return <PanelClientes />;
      case "Pedidos":
        return <PanelPedidos />;
      case "Ingresos":
        return <PanelIngresos />;
      case "AtencionAlCliente":
        return <PanelAtencionAlCliente />;

      case "Solicitudes":
        return <PanelSolicitudes />;

      case "Productos":
        return <PanelProductos />;
    }
  };

  const obtenerRango = async () => {
    const empleado = localStorage.getItem("empleado");
    try {
      let respuesta = await obtenerRangoEmpleado(empleado);
      setRangoEmpleado(respuesta);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    obtenerRango();
  });

  useEffect(() => {
    const loggingStatus = localStorage.getItem("empleado");

    if (loggingStatus) {
      const checkJWT = async () => {
        try {
          let respuesta = await comprobarJWTEmpleado(loggingStatus);

          // Aquí puedes manejar la respuesta para actualizar el estado de `estaLogeado` según sea necesario
          setEstaLogeado(respuesta === "true"); // Ajusta esta lógica según la respuesta real que obtienes
        } catch (error) {
          console.error("Error comprobando el JWT:", error);
        }
      };

      checkJWT();
    }

    setEstaLogeado(loggingStatus === "true");
  }, []);

  const desplegarMenuMovil = () => {
    setOcultarMenuMovil(false);
    setTimeout(() => {
      setDeplegarMenu(true);
    }, 400);
  };

  const ocultarMenu = () => {
    setDeplegarMenu(false);
    setTimeout(() => {
      setOcultarMenuMovil(true);
    }, 400);
  };

  return (
    <>
      <div className="h-screen bg-slate-300">
        <div className="flex justify-center items-center h-screen">
          {estaLogeado ? (
            <>
              <div className="flex w-full">
                {desplegarMenu ? (
                  <>
                    <div
                      className="fixed cursor-pointer left-0 p-2 bg-color1 shadow-xl rounded-r-3xl z-30 mt-3 text-3xl text-white md:hidden"
                      onClick={() => {
                        ocultarMenu();
                      }}
                    >
                      <FiChevronsLeft />
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className="fixed cursor-pointer left-0 p-2 bg-color1 shadow-xl rounded-r-3xl z-20 mt-3 text-3xl text-white md:hidden"
                      onClick={() => {
                        desplegarMenuMovil();
                      }}
                    >
                      <FiChevronsRight />
                    </div>
                  </>
                )}

                <div
                  id="menuLateral"
                  className={`${
                    desplegarMenu ? "translate-x-0" : "-translate-x-full"
                  }  ${
                    ocultarMenuMovil ? "hidden" : "flex"
                  } md:flex md:translate-x-0 w-full fixed md:relative  md:w-1/6 h-screen flex-col border border-2 border-t-0 border-b-0 bg-slate-300 transition ease-in-out duration-200 z-20`}
                >
                  <button
                    className="mt-14 m-4 md:m-0 md:mt-2 md:w-6/6 md:mr-2 flex items-center justify-center md:justify-start md:pl-9 p-4 md:rounded-r-full bg-slate-100 mt-2 gap-2 hover:bg-color1 hover:text-white transition ease-in-out duration-200"
                    onClick={() => {
                      setComponenteActivo("Empleados");
                      ocultarMenu();
                    }}
                  >
                    <GrUserWorker /> Empleados{" "}
                  </button>
                  <button
                    className="m-4 md:m-0 md:mt-2 md:w-6/6 md:mr-2 flex items-center justify-center md:justify-start md:pl-9 p-4 md:rounded-r-full bg-slate-100 mt-2 gap-2 hover:bg-color1 hover:text-white transition ease-in-out duration-200"
                    onClick={() => {
                      setComponenteActivo("Clientes");
                      ocultarMenu();
                    }}
                  >
                    <FaUser /> Clientes
                  </button>
                  

                  <button
                    className="m-4 md:m-0 md:mt-2 md:w-6/6 md:mr-2 flex items-center justify-center md:justify-start md:pl-9 p-4 md:rounded-r-full bg-slate-100 mt-2 gap-2 hover:bg-color1 hover:text-white transition ease-in-out duration-200"
                    onClick={() => {
                      setComponenteActivo("Pedidos");
                      ocultarMenu();
                    }}
                  >
                    <LiaBoxSolid /> Pedidos
                  </button>
                  <button
                    className="m-4 md:m-0 md:mt-2 md:w-6/6 md:mr-2 flex items-center justify-center md:justify-start md:pl-9 p-4 md:rounded-r-full bg-slate-100 mt-2 gap-2 hover:bg-color1 hover:text-white transition ease-in-out duration-200"
                    onClick={() => {
                      setComponenteActivo("Ingresos");
                      ocultarMenu();
                    }}
                  >
                    <ImStatsDots /> Ingresos
                  </button>
                  <button
                    className="m-4 md:m-0 md:mt-2 md:w-6/6 md:mr-2 flex items-center justify-center md:justify-start md:pl-9 p-4 md:rounded-r-full bg-slate-100 mt-2 gap-2 hover:bg-color1 hover:text-white transition ease-in-out duration-200"
                    onClick={() => {
                      setComponenteActivo("AtencionAlCliente");
                      ocultarMenu();
                    }}
                  >
                    <RiCustomerService2Fill />
                    Atencion al Cliente
                  </button>

                  <button
                    className="m-4 md:m-0 md:mt-2 md:w-6/6 md:mr-2 flex items-center justify-center md:justify-start md:pl-9 p-4 md:rounded-r-full bg-slate-100 mt-2 gap-2 hover:bg-color1 hover:text-white transition ease-in-out duration-200"
                    onClick={() => {
                      setComponenteActivo("Solicitudes");
                      ocultarMenu();
                    }}
                  >
                    <FaRegEnvelope />
                    Solicitudes
                  </button>
                </div>

                <div
                  id="contenido"
                  className="w-full md:w-5/6 h-screen bg-slate-200 overflow-y-scroll"
                >
                  {componenteRenderizado()}
                </div>
              </div>
            </>
          ) : (
            <div className=" w-2/6 bg-white shadow-md p-2 rounded-xl text-center mb-32">
              <form
                action=""
                onSubmit={comprobarEmpleado}
                className="flex flex-col"
              >
                <label htmlFor="usuario">Nombre de usuario</label>
                <input
                  type="text"
                  name="usuario"
                  id="usuario"
                  className="text-center text-black"
                  required
                />

                <label htmlFor="clave">Clave del usuario</label>
                <input
                  type="password"
                  name="clave"
                  id="clave"
                  className="text-center text-black"
                  required
                />

                <input
                  type="submit"
                  value="Acceder"
                  className="bg-color2 p-2 mt-2 hover:bg-color1 cursor-pointer text-white"
                />
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Empleados;
