function Principal() {
  return (
    <>
      <div className="w-full  text-center flex flex-col justify-center items-center ">
        <section className=" w-full flex items-center justify-center bg-imagen-incio bg-fixed bg-cover bg-no-repeat">
          <img
            src="/img/ecoSenderIconoBg.png"
            height={400}
            width={400}
            alt=""
            className="transition ease-in-out duration-300 hover:scale-105 drop-shadow-xl m-16"
          />
        </section>

        <section className="h-96 w-3/4 p-8 m-6">
          <h1 className="text-4xl font-roboto p-4">Bienvenido a EcoSender!</h1>
          <p className="font-roboto">
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

        <section className="w-4/4 h-screen">
          <div className="flex justify-between">
            <img
              src="/img/solar-panels-1794467_1280.jpg"
              height={600}
              width={600}
              alt=""
              className="w-3/6"
            />
            <div className="w-3/6 flex justify-center align-middle items-center bg-color1 text-white">
              <section className="w-2/3">
                <h2 className="text-4xl font-roboto">
                  Instalaciones Fotovoltaicas
                </h2>

                <p>
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

        <section className="h-3/5 w-3/4 p-8">
          <h1 className="text-4xl font-roboto p-4">Nuestros Productos</h1>

          <div className="flex w-full justify-around items-center mt-8">
            <div className="bg-color1 text-white w-1/3 m-3">Placas Solares</div>
            <div className="bg-color1 text-white w-1/3 m-3">Prueba</div>
            <div className="bg-color1 text-white w-1/3 m-3">Prueba</div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Principal;
