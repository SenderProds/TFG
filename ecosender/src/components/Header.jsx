import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { comprobarGoogleId, comprobarJWT } from "../utilidades/sesion";
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

const Header = () => {
  const [estaLogeado, setEstaLogeado] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    const loggingStatus = localStorage.getItem("sesion");
    const googleId = localStorage.getItem("googleId");

    if (loggingStatus) {
      const checkJWT = async () => {
        try {
          let respuesta = await comprobarJWT(loggingStatus);
          setEstaLogeado(respuesta !== "false");
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
          setEstaLogeado(respuesta !== "false");
        } catch (error) {
          console.error(error);
        }
      };
      comprobarGoId();
    }
  }, []);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  return (
    <>
      <nav className="bg-color1 flex justify-between fixed w-full z-30 h-20 sm:h-28 shadow-xl sm:shadow-xl">
        <ul className="w-1/5 xl:w-2/5 cursor-pointer flex items-center pl-4">
          <Link to="/">
            <img
              src="/img/ecoSenderIcono_Whute.png"
              alt="EcoSender Logo"
              height={110}
              width={110}
              className="hover:scale-105 transition ease-in-out h-16 sm:h-28 w-16 sm:w-28"
            />
          </Link>
        </ul>
        <div className="flex items-center pr-4 sm:hidden">
          <button onClick={toggleMenu}>
            {menuAbierto ? (
              <IoMdClose className="text-white text-2xl" />
            ) : (
              <IoMdMenu className="text-white text-2xl" />
            )}
          </button>
        </div>
        <ul className={`text-white w-full sm:w-4/5 xl:w-2/5 justify-end sm:justify-around items-center text-xl transition-transform transform ${menuAbierto ? 'translate-x-0' : 'translate-x-full'} sm:transform-none fixed sm:static top-20 sm:top-auto right-0 bg-color1 sm:bg-transparent sm:flex flex-col sm:flex-row  shadow-xl sm:shadow-none`}>
          <li className="p-4 sm:p-0">
            <Link
              to="/"
              className="block p-4 hover:bg-color2  transition ease-linear delay-100 duration-300"
              onClick={() => setMenuAbierto(false)}
            >
              Principal
            </Link>
          </li>
          <li className="p-4 sm:p-0">
            <Link
              to="/servicios"
              className="block p-4 hover:bg-color2  transition ease-linear delay-100 duration-300"
              onClick={() => setMenuAbierto(false)}
            >
              Servicios
            </Link>
          </li>
          <li className="p-4 sm:p-0">
            <Link
              to="/productos"
              className="block p-4 hover:bg-color2  transition ease-linear delay-100 duration-300"
              onClick={() => setMenuAbierto(false)}
            >
              Productos
            </Link>
          </li>
          <li className="p-4 sm:p-0">
            {estaLogeado ? (
              <Link
                to="/cuenta"
                className="block p-4 hover:bg-color2  transition ease-linear delay-100 duration-300"
                onClick={() => setMenuAbierto(false)}
              >
                Cuenta
              </Link>
            ) : (
              <Link
                to="/inicioSesion"
                className="block p-4 hover:bg-color2  transition ease-linear delay-100 duration-300"
                onClick={() => setMenuAbierto(false)}
              >
                Iniciar Sesion
              </Link>
            )}
          </li>
        </ul>
      </nav>
      <div className="h-20 sm:h-28"></div>
      <Outlet />
    </>
  );
};

export default Header;