import { useEffect, useState } from "react";
import {
  comprobarEmpleado,
  comprobarJWTEmpleado,
  obtenerRangoEmpleado,
} from "../utilidades/empleados";
import { GrUserWorker } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
import { LiaBoxSolid } from "react-icons/lia";
import { ImStatsDots } from "react-icons/im";
import PanelEmpleados from "./empleados/PanelEmpleados";
import PanelClientes from "./empleados/PanelClientes";
import PanelPedidos from "./empleados/PanelPedidos";
import PanelIngresos from "./empleados/PanelIngresos";
import { RiCustomerService2Fill } from "react-icons/ri";
import PanelAtencionAlCliente from "./empleados/PanelAtencionAlCliente";

const Empleados = () => {
  const [componenteActivo, setComponenteActivo] = useState("Ingresos");
  const [estaLogeado, setEstaLogeado] = useState(false);
  const [rangoEmpleado, setRangoEmpleado] = useState();

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

  return (
    <>
      <div className="h-screen">
        <div className="flex justify-center">
          {estaLogeado ? (
            <>
              <div className="flex w-full">
                <div
                  id="menuLateral"
                  className="w-1/6 h-screen flex flex-col border border-2 border-t-0 border-b-0"
                >
                  <button
                    className="w-5/6 flex items-center justify-start pl-9 p-4 rounded-r-full bg-slate-300 mt-2"
                    onClick={() => setComponenteActivo("Empleados")}
                  >
                    <GrUserWorker /> Empleados{" "}
                  </button>
                  <button
                    className="w-5/6 flex items-center justify-start pl-9 p-4 rounded-r-full bg-slate-300 mt-2"
                    onClick={() => setComponenteActivo("Clientes")}
                  >
                    <FaUser /> Clientes
                  </button>
                  <button
                    className="w-5/6 flex items-center justify-start pl-9 p-4 rounded-r-full bg-slate-300 mt-2"
                    onClick={() => setComponenteActivo("Pedidos")}
                  >
                    <LiaBoxSolid /> Pedidos
                  </button>
                  <button
                    className="w-5/6 flex items-center justify-start pl-9 p-4 rounded-r-full bg-slate-300 mt-2"
                    onClick={() => setComponenteActivo("Ingresos")}
                  >
                    <ImStatsDots /> Ingresos
                  </button>
                  <button
                    className="w-5/6 flex items-center justify-start pl-9 p-4 rounded-r-full bg-slate-300 mt-2"
                    onClick={() => setComponenteActivo("AtencionAlCliente")}
                  >
                    <RiCustomerService2Fill />
                    Atencion al Cliente
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
          ) : (
            <form
              action=""
              onSubmit={comprobarEmpleado}
              className="flex flex-col w-2/6 bg-color1 p-2 rounded-lg text-white text-center"
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
                className="bg-color2 p-2 mt-2 hover:bg-color1 cursor-pointer"
              />
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Empleados;
