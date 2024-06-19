import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import { useState } from "react";
import { comprobarGoogleId, comprobarJWT } from "../utilidades/sesion";

const Servicios = () => {
  const [mostrarModal, setMostrarModal] = useState();
  const navigate = useNavigate();

  /**
   * Al hacer click sobre el servicio,
   * se comprueba que la sesion esta iniciada
   * de lo contrario se muestra el ModaL
   * @param {*} idServicio
   */
  const solicitudServicio = (idServicio) => {
    let sesion = localStorage.getItem("sesion");
    let googleId = localStorage.getItem("googleId");

    if (sesion) {
      let respuesta = comprobarJWT(sesion);


      if (respuesta !== "false") {
        localStorage.setItem("servicio", idServicio);

        navigate("/solicitarServicio");
      } else {
        setMostrarModal(true);
      }
    } else if (googleId) {
      let respuesta = comprobarGoogleId(googleId);

      localStorage.setItem("servicio", idServicio);

      navigate("/solicitarServicio");
    } else {
      setMostrarModal(true);
    }
  };

  return (
    <>
      <div className="w-full  text-center flex flex-col justify-center items-center md:h-full">
        <h1 className="text-4xl font-bold my-8">Servicios</h1>

        <section className="w-full h-auto md:h-screen p-4">
          <div className="flex flex-col md:flex-row justify-between md:space-x-4">
            <div
              className="w-full md:w-1/3 flex flex-col mb-4 md:mb-0 hover:scale-105 transition ease-in-out duration-300 cursor-pointer"
              onClick={() => solicitudServicio(1)}
            >
              <img
                src="/img/Ee9Td8hBSHW92vH_ydyKlw.png"
                className="w-full h-auto"
                alt="Planificación"
              />
              <div className="w-full flex flex-col justify-center items-center bg-color2 text-white p-4 h-full">
                <section className="w-full">
                  <h2 className="text-2xl md:text-4xl font-roboto">
                    Planificación
                  </h2>
                  <p className="text-sm md:text-sm">
                    Nuestro equipo experto te ayudará a planificar tu sistema
                    fotovoltaico de manera eficiente, considerando tus
                    necesidades específicas y optimizando el rendimiento de tu
                    instalación.
                  </p>
                </section>
              </div>
            </div>

            <div
              className="w-full md:w-1/3 flex flex-col mb-4 md:mb-0 hover:scale-105 transition ease-in-out duration-300 cursor-pointer"
              onClick={() => solicitudServicio(2)}
            >
              <img
                src="/img/solar-panels-1794467_1280.jpg"
                className="w-full h-auto"
                alt="Paneles Solares"
              />
              <div className="w-full flex flex-col justify-center items-center bg-color2 text-white p-4 h-full">
                <section className="w-full">
                  <h2 className="text-2xl md:text-4xl font-roboto">
                    Instalaciones Fotovoltaicas
                  </h2>
                  <p className="text-sm md:text-sm">
                    Ofrecemos servicios integrales de instalaciones
                    fotovoltaicas diseñados para maximizar el aprovechamiento de
                    la energía solar, reduciendo significativamente tus costos
                    energéticos y tu huella de carbono.
                  </p>
                </section>
              </div>
            </div>

            <div
              className="w-full md:w-1/3 flex flex-col hover:scale-105 transition ease-in-out duration-300 cursor-pointer"
              onClick={() => solicitudServicio(3)}
            >
              <img
                src="/img/mantenimiento-de-instalacion-de-paneles-solares-en-4THGNsFKRbmAYuMDKUPaRQ-lg9YWfJ1RW-X8Nf6vL3u0A.jpeg"
                className="w-full h-auto"
                alt="Mantenimiento"
              />
              <div className="w-full flex flex-col justify-center items-center bg-color2 text-white p-4 h-full">
                <section className="w-full">
                  <h2 className="text-2xl md:text-4xl font-roboto">
                    Mantenimiento
                  </h2>
                  <p className="text-sm md:text-sm">
                    Ofrecemos servicios de mantenimiento preventivo y correctivo
                    para garantizar el óptimo funcionamiento y la longevidad de
                    tu sistema fotovoltaico, asegurando que continúe produciendo
                    energía de manera confiable.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Modal show={mostrarModal} onClose={() => setMostrarModal(false)} />
    </>
  );
};

export default Servicios;
