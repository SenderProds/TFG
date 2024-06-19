import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="relative w-full bg-color1 sm:h-1/5 z-10 flex flex-col sm:flex-row items-center sm:items-start justify-around text-white">
        <img
          src="/img/ecoSenderIcono_Whute.png"
          alt=""
          height={180}
          width={180}
          className="hover:scale-105 transition ease-in-out"
        />

        <div className="flex flex-col sm:flex-row sm:items-start w-3/4 justify-around items-center gap-11 p-4 text-center">
          <div>
            <p className="font-medium text-white">Productos</p>
            <ul className="list-none text-gray-300">
              <li>
                <Link to="/productos">Placas Solares</Link>
              </li>
              <li>
                <Link to="/productos">Kit Solar Aislada</Link>
              </li>
              <li>
                <Link to="/productos">Baterias</Link>
              </li>
              <li>
                <Link to="/productos">Inversores</Link>
              </li>
              <li>
                <Link to="/productos">Reguladores</Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-gray-200">Servicios</p>
            <ul className="list-none text-gray-300">
              <li>
              <Link to="/servicios">Planificacion</Link>


              </li>
              <li>
              <Link to="/servicios">Instalacion</Link>

              </li>
              <li>
              <Link to="/servicios">Mantenimiento</Link>

              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-gray-200">Enlaces Utiles</p>
            <ul className="list-none text-gray-300">

              <li>
              <Link to="/chat">Chat en vivo</Link>

              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
