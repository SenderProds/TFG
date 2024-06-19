import { Button } from "@tremor/react";
import { useEffect, useState } from "react";
import {
  MdOutlinePassword,
  IoSettingsOutline,
  FaRegSave,
} from "../../components/Iconos";
import axios from "axios";

const CuentaUsuario = () => {
  const [datosCuenta, setDatosCuenta] = useState();
  const [idUsuario, setIdUsuario] = useState();
  const [guardandoDatos, setGuardandoDatos] = useState();
  const [numeroPedidos, setNumeroPedidos] = useState();

  const obtenerIdUsuario = () => {
    const url = "https://ecosender.es/api2/public/api/v1/obtenerIdUsuario";
    const jwt = localStorage.getItem("sesion");
    const googleId = localStorage.getItem("googleId");

    let data = {};
    if (jwt) {
      data = {
        jwt: jwt,
      };
    } else {
      data = {
        googleId: googleId,
      };
    }

    axios
      .post(url, data)
      .then((response) => {
        if (response.data !== "false") {
          setIdUsuario(response.data);
        }
      })
      .catch((error) => console.error(error));
  };

  const obtenerDatosCuenta = () => {
    if (idUsuario) {
      const url =
        "https://ecosender.es/api2/public/api/v1/obtenerDatosUsuario?id=" +
        idUsuario;

      axios
        .get(url)
        .then((response) => {
          setDatosCuenta(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  /**
   * Guarda los nuevos datos del usuario en la base de datos
   */
  const guardarDatosUsuario = (e) => {
    e.preventDefault();
    let nombre = document.getElementById("nombre").value;
    let apellidos = document.getElementById("apellidos").value;
    let direccion = document.getElementById("direccion").value;
    let ciudad = document.getElementById("ciudad").value;
    let dni = document.getElementById("dni").value;
    let telefono = document.getElementById("telefono").value;
    let codigoPostal = document.getElementById("codigoPostal").value;


    const url = "https://ecosender.es/api2/public/api/v1/insertarDatosUsuario";
    let data = {
      idUsuario: idUsuario,
      nombre: nombre,
      apellidos: apellidos,
      dni: dni,
      telefono: telefono,
      direccion: direccion,
      ciudad: ciudad,
      codigoPostal: codigoPostal,
    };

    axios
      .post(url, data)
      .then((response) => {

        if (response.data !== "false") {
          setGuardandoDatos(true);
          setTimeout(() => {
            setGuardandoDatos(false);
          }, 1500);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const obtenerNumeroPedidos = () => {
    const url =
      "https://ecosender.es/api2/public/api/v1/obtenerNumeroPedidosUsuario";
    const data = {
      id: idUsuario,
    };

    axios
      .post(url, data)
      .then((response) => {
        setNumeroPedidos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    obtenerIdUsuario();
  }, []);

  useEffect(() => {
    if (idUsuario) {
      obtenerDatosCuenta();
    }
  }, [idUsuario]);

  useEffect(() => {
    if (idUsuario) {
      obtenerNumeroPedidos();
    }
  }, [idUsuario]);

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="bg-white mt-16 md:mt-4 p-4 m-4 rounded-xl shadow-md w-4/4 md:w-2/4 relative">
          {guardandoDatos ? (
            <>
              <div className="absolute inset-0 bg-slate-900 opacity-75 rounded-xl text-white flex justify-center items-center">
                Datos Guardados
              </div>
            </>
          ) : (
            <></>
          )}
          <h1 className="font-bold text-xl flex items-center gap-2">
            <IoSettingsOutline />
            Ajustes De Cuenta{" "}
          </h1>
          <p>Actualiza tu informacion personal.</p>

          <form action="" className="mt-4" onSubmit={guardarDatosUsuario}>
            <div className=" 2xl:flex justify-around">
              <div>
                <div className="flex justify-between items-center mt-4 gap-2">
                  <label htmlFor="nombre">Nombre</label>
                  <input
                    type="text"
                    className="rounded-xl w-2/3"
                    defaultValue={datosCuenta ? datosCuenta["Nombre"] : ""}
                    name="nombre"
                    id="nombre"
                    required
                  />
                </div>

                <div className="flex justify-between items-center mt-4 gap-2">
                  <label htmlFor="apellidos">Apellidos</label>
                  <input
                    type="text"
                    className="rounded-xl w-2/3"
                    defaultValue={datosCuenta ? datosCuenta["Apellidos"] : ""}
                    name="apellidos"
                    id="apellidos"
                    required
                  />
                </div>

                <div className="flex justify-between items-center mt-4 gap-2">
                  <label htmlFor="direcion">Direccion</label>
                  <input
                    type="text"
                    className="rounded-xl w-2/3"
                    defaultValue={datosCuenta ? datosCuenta["Direccion"] : ""}
                    name="direccion"
                    id="direccion"
                    required
                  />
                </div>

                <div className="flex justify-between items-center mt-4 gap-2">
                  <label htmlFor="ciudad">Ciudad</label>
                  <input
                    type="text"
                    className="rounded-xl w-2/3"
                    defaultValue={datosCuenta ? datosCuenta["ciudad"] : ""}
                    name="ciudad"
                    id="ciudad"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mt-4 gap-2">
                  <label htmlFor="dni">DNI</label>
                  <input
                    type="text"
                    className="rounded-xl w-2/3"
                    defaultValue={datosCuenta ? datosCuenta["DNI"] : ""}
                    name="dni"
                    id="dni"
                    required
                  />
                </div>

                <div className="flex justify-between items-center mt-4 gap-2">
                  <label htmlFor="telefono">Telefono(+34)</label>
                  <input
                    type="text"
                    className="rounded-xl w-2/3"
                    defaultValue={datosCuenta ? datosCuenta["Telefono"] : ""}
                    name="telefono"
                    id="telefono"
                    required
                  />
                </div>

                <div className="flex justify-between items-center mt-4 gap-2">
                  <label htmlFor="codigoPostal">Codigo Postal</label>
                  <input
                    type="text"
                    className="rounded-xl w-2/3"
                    defaultValue={
                      datosCuenta ? datosCuenta["codigoPostal"] : ""
                    }
                    name="codigoPostal"
                    id="codigoPostal"
                    required
                  />
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              color="zinc"
              icon={FaRegSave}
              className="mt-4 bg-color1 "
            >
              Guardar Datos
            </Button>
          </form>
        </div>

        <div className="w-full md:w-2/4 bg-white m-4 p-4 rounded-xl shadow-md">
          <h1 className="font-bold text-xl">N Pedidos</h1>
          <p>Numero total de pedidos realizados.</p>
          {numeroPedidos ? <>{numeroPedidos}</> : <></>}
        </div>
      </div>
    </>
  );
};

export default CuentaUsuario;
