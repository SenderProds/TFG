const Servicios = () => {
    return (
      <>
        <div className="w-full  text-center flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold my-8">Servicios</h1>
  
          <section className="w-full h-auto sm:h-screen p-4">
            <div className="flex flex-col sm:flex-row justify-between sm:space-x-4">
              {/* Servicio 2 */}
              <div className="w-full sm:w-1/3 flex flex-col mb-4 sm:mb-0 ">
                <img
                  src="/img/solar-panels-1794467_1280.jpg"
                  className="w-full h-auto"
                  alt="Planificación"
                />
                <div className="w-full flex flex-col justify-center items-center bg-color1 text-white p-4 h-full">
                  <section className="w-full">
                    <h2 className="text-2xl sm:text-4xl font-roboto">
                      Planificación
                    </h2>
                    <p className="text-sm sm:text-base">
                      Nuestro equipo experto te ayudará a planificar tu sistema
                      fotovoltaico de manera eficiente, considerando tus
                      necesidades específicas y optimizando el rendimiento de tu
                      instalación.
                    </p>
                  </section>
                </div>
              </div>
  
              {/* Servicio 1 */}
              <div className="w-full sm:w-1/3 flex flex-col mb-4 sm:mb-0 ">
                <img
                  src="/img/solar-panels-1794467_1280.jpg"
                  className="w-full h-auto"
                  alt="Paneles Solares"
                />
                <div className="w-full flex flex-col justify-center items-center bg-color1 text-white p-4 h-full">
                  <section className="w-full">
                    <h2 className="text-2xl sm:text-4xl font-roboto">
                      Instalaciones Fotovoltaicas
                    </h2>
                    <p className="text-sm sm:text-base">
                      En Ecosender, nos dedicamos a transformar la energía solar
                      en una solución accesible y eficiente para todos. Ofrecemos
                      servicios integrales de instalaciones fotovoltaicas
                      diseñados para maximizar el aprovechamiento de la energía
                      solar, reduciendo significativamente tus costos energéticos
                      y tu huella de carbono.
                    </p>
                  </section>
                </div>
              </div>
  
              {/* Servicio 3 */}
              <div className="w-full sm:w-1/3 flex flex-col ">
                <img
                  src="/img/solar-panels-1794467_1280.jpg"
                  className="w-full h-auto"
                  alt="Mantenimiento"
                />
                <div className="w-full flex flex-col justify-center items-center bg-color1 text-white p-4 h-full">
                  <section className="w-full">
                    <h2 className="text-2xl sm:text-4xl font-roboto">
                      Mantenimiento
                    </h2>
                    <p className="text-sm sm:text-base">
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
      </>
    );
  };
  
  export default Servicios;
  