import axios from "axios";

function Principal() {
  const obtenerImagenAleatoria = (opinion) => {
    const url = "https://randomuser.me/api/";
    axios
      .get(url)
      .then((response) => {
        document.getElementById(opinion).src =
          response.data.results[0].picture.large;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="w-full text-center flex flex-col justify-center items-center">
        {/* Hero Section */}
        <section className="w-full flex items-center justify-center bg-imagen-incio bg-fixed bg-cover bg-no-repeat">
          <img
            src="/img/ecoSenderIconoBg.png"
            className="transition ease-in-out duration-300 hover:scale-105 drop-shadow-xl m-8 sm:m-16 w-40 h-40 sm:w-80 sm:h-80"
            alt="EcoSender Icon"
          />
        </section>

        <section className="h-auto w-11/12 sm:w-3/4 p-4 sm:p-8 m-6">
          <h1 className="text-2xl sm:text-4xl font-roboto p-4">
            Bienvenido a EcoSender!
          </h1>
          <p className="font-roboto text-sm sm:text-base">
            En EcoSender, nos dedicamos apasionadamente a brindar servicios y
            productos fotovoltaicos de alta calidad para satisfacer las
            necesidades energéticas de nuestros clientes. Nuestra misión es
            hacer que la transición a la energía solar sea accesible, fácil y
            emocionante para todos, desde usuarios experimentados hasta aquellos
            que recién están explorando el mundo de la energía renovable. Con
            una amplia gama de servicios que incluyen planificación, instalación
            y mantenimiento de sistemas fotovoltaicos, así como una tienda en
            línea repleta de productos de última generación, estamos aquí para
            ayudarte en cada paso del camino hacia un futuro más sostenible y
            energéticamente independiente.
          </p>
        </section>

        <section className="h-auto w-12/12 sm:w-full sm:w-3/4 p-4 sm:p-8 mb-6 bg-color1 text-white">
          <h2 className="text-2xl sm:text-4xl font-roboto p-4">
            Sobre Nosotros
          </h2>
          <p className="font-roboto text-sm sm:text-base">
            Somos una empresa comprometida con la sostenibilidad y la energía
            renovable. Nuestro objetivo es proporcionar soluciones energéticas
            eficientes y accesibles para todos. Contamos con un equipo de
            expertos en energía solar que están aquí para ayudarte en cada paso
            del proceso, desde la planificación hasta la instalación y el
            mantenimiento de sistemas fotovoltaicos.
          </p>
        </section>

        <section className="w-full h-auto ">
          <div className="flex flex-col sm:flex-row justify-between">
            <img
              src="/img/Ee9Td8hBSHW92vH_ydyKlw.png"
              className="w-full sm:w-3/6 h-auto"
              alt="Solar Panels"
            />
            <div className="relative w-full sm:w-3/6 flex justify-center align-middle items-center bg-color2 text-white p-4">
              <div className="absolute bg-imagen-planificacion bg-cover bg-center opacity-5 inset-0"></div>
              <section className="w-full sm:w-2/3">
                <h2 className="text-2xl sm:text-4xl font-roboto">
                  Planificación
                </h2>
                <p className="text-sm sm:text-base">
                  Nuestro equipo experto te ayudará a planificar tu sistema
                  fotovoltaico de manera eficiente, considerando tus necesidades
                  específicas y optimizando el rendimiento de tu instalación.
                </p>
              </section>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-between mt-6">
            <div className="relative w-full sm:w-3/6 flex justify-center align-middle items-center bg-color1 text-white p-4">
              <div className="absolute bg-imagen-instalacion bg-cover bg-center opacity-5 inset-0"></div>
              <section className="w-full sm:w-2/3">
                <h2 className="text-2xl sm:text-4xl font-roboto">
                  Instalaciones Fotovoltaicas
                </h2>
                <p className="text-sm sm:text-base">
                  En Ecosender, nos dedicamos a transformar la energía solar en
                  una solución accesible y eficiente para todos. Ofrecemos
                  servicios integrales de instalaciones fotovoltaicas diseñados
                  para maximizar el aprovechamiento de la energía solar,
                  reduciendo significativamente tus costos energéticos y tu
                  huella de carbono.
                </p>
              </section>
            </div>
            <img
              src="/img/solar-panels-1794467_1280.jpg"
              className="w-full sm:w-3/6 h-auto"
              alt="Solar Panels"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between mt-6">
            <img
              src="/img/mantenimiento-de-instalacion-de-paneles-solares-en-4THGNsFKRbmAYuMDKUPaRQ-lg9YWfJ1RW-X8Nf6vL3u0A.jpeg"
              className="w-full sm:w-3/6 h-auto"
              alt="Solar Panels"
            />
            <div className="w-full sm:w-3/6 bg-color2 relative text-white p-4 flex justify-center items-center">
              <div className="absolute inset-0 bg-imagen-mantenimiento bg-cover bg-center opacity-5 "></div>
              <section className="w-full sm:w-2/3 ">
                <h2 className="text-2xl sm:text-4xl font-roboto">
                  Mantenimiento
                </h2>
                <p className="text-sm sm:text-base">
                  Ofrecemos servicios de mantenimiento preventivo y correctivo
                  para garantizar el óptimo funcionamiento y la longevidad de tu
                  sistema fotovoltaico, asegurando que continúe produciendo
                  energía de manera confiable.
                </p>
              </section>
            </div>
          </div>
        </section>

        

        <section className="h-auto w-12/12 sm:w-4/4 p-4 sm:p-8 bg-color1 mt-6 mb-6">
          <h2 className="text-2xl sm:text-4xl font-roboto p-4 text-white">Opiniones</h2>
          <div className="flex flex-col sm:flex-row justify-around items-center mt-8">
            <div className="bg-white text-black w-full sm:w-1/3 m-3 p-4 rounded-lg shadow-lg flex flex-col justify-center items-center hover:scale-105 transition ease-in-out duration-200">
              <img
                src={obtenerImagenAleatoria("opinion1")}
                alt=""
                height={100}
                width={100}
                id="opinion1"
                className="rounded-full shadow-md"
              />

              <p className="text-sm sm:text-base">
                "EcoSender hizo que la transición a la energía solar fuera muy
                sencilla y económica. ¡Altamente recomendados!"
              </p>
              <p className="text-sm sm:text-base mt-2">- Cliente Satisfecho</p>
            </div>
            <div className="bg-white text-black w-full sm:w-1/3 m-3 p-4 rounded-lg shadow-lg flex flex-col justify-center items-center hover:scale-105 transition ease-in-out duration-200">
              <img
                src={obtenerImagenAleatoria("opinion2")}
                alt=""
                height={100}
                width={100}
                id="opinion2"
                className="rounded-full shadow-md"
              />
              <p className="text-sm sm:text-base">
                "Su equipo de soporte es increíble. Resolvieron todas mis dudas
                y me ayudaron a elegir el mejor sistema para mi hogar."
              </p>
              <p className="text-sm sm:text-base mt-2">- Cliente Satisfecho</p>
            </div>
            <div className="bg-white text-black w-full sm:w-1/3 m-3 p-4 rounded-lg shadow-lg flex flex-col justify-center items-center hover:scale-105 transition ease-in-out duration-200">
              <img
                src={obtenerImagenAleatoria("opinion3")}
                alt=""
                height={100}
                width={100}
                id="opinion3"
                className="rounded-full shadow-md"
              />
              <p className="text-sm sm:text-base">
                "La instalación fue rápida y profesional. Ahora estoy ahorrando
                en mis facturas de energía todos los meses."
              </p>
              <p className="text-sm sm:text-base mt-2">- Cliente Satisfecho</p>
            </div>
          </div>
        </section>

        
      </div>
    </>
  );
}

export default Principal;
