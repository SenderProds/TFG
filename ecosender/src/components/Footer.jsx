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
                <a href="">Placas Solares</a>
              </li>
              <li>
                <a href="">Kit Solar Aislada</a>
              </li>
              <li>
                <a href="">Baterias</a>
              </li>
              <li>
                <a href="">Inversores</a>
              </li>
              <li>
                <a href="">Reguladores</a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-gray-200">Servicios</p>
            <ul className="list-none text-gray-300">
              <li>
                <a href="">Planificacion</a>
              </li>
              <li>
                <a href="">Instalacion</a>
              </li>
              <li>
                <a href="">Mantenimiento</a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-gray-200">Enlaces Utiles</p>
            <ul className="list-none text-gray-300">
              <li>
                <a href="">Contacto</a>
              </li>
              <li>
                <a href="">Preguntas Frecuentes</a>
              </li>
              <li>
                <a href="">Chat en vivo</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
