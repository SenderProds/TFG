function Principal() {
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

        {/* Welcome Section */}
        <section className="h-auto w-11/12 sm:w-3/4 p-4 sm:p-8 m-6">
          <h1 className="text-2xl sm:text-4xl font-roboto p-4">
            Bienvenido a EcoSender!
          </h1>
          <p className="font-roboto text-sm sm:text-base">
            En [Nombre de tu Empresa], nos dedicamos apasionadamente a brindar
            servicios y productos fotovoltaicos de alta calidad para satisfacer
            las necesidades energéticas de nuestros clientes. Nuestra misión es
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

        {/* About Us Section */}
        <section className="h-auto w-11/12 sm:w-3/4 p-4 sm:p-8 m-6 bg-gray-100 rounded-lg">
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

        {/* Services Section */}
        <section className="w-full h-auto sm:h-screen p-4">
          <div className="flex flex-col sm:flex-row justify-between">
            <img
              src="/img/solar-panels-1794467_1280.jpg"
              className="w-full sm:w-3/6 h-auto"
              alt="Solar Panels"
            />
            <div className="w-full sm:w-3/6 flex justify-center align-middle items-center bg-color1 text-white p-4">
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
          </div>
        </section>

        {/* Products Section */}
        <section className="h-auto sm:h-3/5 w-11/12 sm:w-3/4 p-4 sm:p-8">
          <h1 className="text-2xl sm:text-4xl font-roboto p-4">
            Nuestros Productos
          </h1>
          <div className="flex flex-col sm:flex-row w-full justify-around items-center mt-8">
            <div className="bg-color1 text-white w-full sm:w-1/3 m-3 p-4">
              Placas Solares
            </div>
            <div className="bg-color1 text-white w-full sm:w-1/3 m-3 p-4">
              Inversores
            </div>
            <div className="bg-color1 text-white w-full sm:w-1/3 m-3 p-4">
              Baterías
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="h-auto w-11/12 sm:w-3/4 p-4 sm:p-8 m-6 bg-gray-100 rounded-lg">
          <h2 className="text-2xl sm:text-4xl font-roboto p-4">Testimonios</h2>
          <div className="flex flex-col sm:flex-row justify-around items-center mt-8">
            <div className="bg-white text-black w-full sm:w-1/3 m-3 p-4 rounded-lg shadow-lg">
              <p className="text-sm sm:text-base">
                "EcoSender hizo que la transición a la energía solar fuera muy
                sencilla y económica. ¡Altamente recomendados!"
              </p>
              <p className="text-sm sm:text-base mt-2">- Cliente Satisfecho</p>
            </div>
            <div className="bg-white text-black w-full sm:w-1/3 m-3 p-4 rounded-lg shadow-lg">
              <p className="text-sm sm:text-base">
                "Su equipo de soporte es increíble. Resolvieron todas mis dudas
                y me ayudaron a elegir el mejor sistema para mi hogar."
              </p>
              <p className="text-sm sm:text-base mt-2">- Cliente Satisfecho</p>
            </div>
            <div className="bg-white text-black w-full sm:w-1/3 m-3 p-4 rounded-lg shadow-lg">
              <p className="text-sm sm:text-base">
                "La instalación fue rápida y profesional. Ahora estoy ahorrando
                en mis facturas de energía todos los meses."
              </p>
              <p className="text-sm sm:text-base mt-2">- Cliente Satisfecho</p>
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section className="h-auto w-11/12 sm:w-3/4 p-4 sm:p-8 m-6">
          <h2 className="text-2xl sm:text-4xl font-roboto p-4">Contacto</h2>
          <form className="w-full flex flex-col items-center">
            <input
              type="text"
              placeholder="Nombre"
              className="w-full sm:w-1/2 p-2 m-2 border rounded-lg"
            />
            <input
              type="email"
              placeholder="Correo Electrónico"
              className="w-full sm:w-1/2 p-2 m-2 border rounded-lg"
            />
            <textarea
              placeholder="Mensaje"
              className="w-full sm:w-1/2 p-2 m-2 border rounded-lg"
            ></textarea>
            <button
              type="submit"
              className="bg-color1 text-white w-full sm:w-1/2 p-2 m-2 rounded-lg"
            >
              Enviar
            </button>
          </form>
        </section>
      </div>
    </>
  );
}

export default Principal;