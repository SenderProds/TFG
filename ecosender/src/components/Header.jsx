import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { comprobarJWT } from "../utilidades/sesion";

const Header = () => {
  const [estaLogeado, setEstaLogeado] = useState(false);

  useEffect(() => {
    const loggingStatus = localStorage.getItem("sesion");

    if (loggingStatus) {
      const checkJWT = async () => {
        try {
          let respuesta = await comprobarJWT(loggingStatus);

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
      <nav className="bg-color1 flex justify-between fixed w-full z-30 h-28 shadow-xl">
        <ul className="w-1/5 xl:w-2/5 cursor-pointer ">
          {" "}
          <Link to="/">
            <img
              src="/img/ecoSenderIcono_Whute.png"
              alt=""
              height={110}
              width={110}
              className="hover:scale-105 transition ease-in-out"
            />
          </Link>
        </ul>
        <ul className="flex text-white w-4/5 xl:w-2/5 justify-around items-center text-xl">
          <li className="">
            <Link
              to="/"
              className="p-8 hover:bg-color2 transition ease-linear delay-100 duration-300"
            >
              Principal
            </Link>
          </li>
          <li>
            <Link
              to="/servicios"
              className="p-8 hover:bg-color2 transition ease-linear delay-100 duration-300"
            >
              Servicios
            </Link>
          </li>
          <li>
            <Link
              to="/productos"
              className="p-8 hover:bg-color2 transition ease-linear delay-100 duration-300"
            >
              Productos
            </Link>
          </li>
          <li>
            {estaLogeado ? (
              <Link
                to={"/cuenta"}
                className="p-8 hover:bg-color2 transition ease-linear delay-100 duration-300"
              >
                Cuenta
              </Link>
            ) : (
              <Link
                to={"/inicioSesion"}
                className="p-8 hover:bg-color2 transition ease-linear delay-100 duration-300"
              >
                Iniciar Sesion
              </Link>
            )}
          </li>
        </ul>
      </nav>
      <div className="h-28"></div>

      <Outlet></Outlet>
    </>
  );
};

export default Header;
