import axios from "axios";
import { useEffect, useState } from "react";

const PanelSolicitudes = () => {
  const url = "https://ecosender.es/api2/public/api/v1/solicitudes";
  const [solicitudes, setSolicitudes] = useState([]);
  const [mensajeSeleccionado, setMensajeSeleccionado] = useState("");

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setSolicitudes(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const getServiceName = (servicioId) => {
    switch (servicioId) {
      case 1:
        return "Planificación";
      case 2:
        return "Instalación";
      case 3:
        return "Mantenimiento";
      default:
        return "Desconocido";
    }
  };

  const toggleModal = (mensaje) => {
    setMensajeSeleccionado(mensaje);
    const modal = document.getElementById("modalSolicitud");
    modal.classList.toggle("hidden");
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center mb-10">
        {solicitudes.length > 0 ? (
          solicitudes.map((solicitud) => (
            <div
              key={solicitud.id}
              className="bg-white rounded-xl p-4 shadow-md mt-6 w-3/4 md:w-3/4 lg:w-2/3 "
            >
              <h2 className="font-bold">ID de Usuario: {solicitud.idUsuario}</h2>
              <p>Servicio: {getServiceName(solicitud.servicio)}</p>
              <button
                onClick={() => toggleModal(solicitud.mensaje)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
              >
                Ver Mensaje
              </button>
            </div>
          ))
        ) : (
          <p className="mt-6">No hay solicitudes</p>
        )}
      </div>

      {/* Modal */}
      <div
        id="modalSolicitud"
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 hidden"
      >
        <div className="bg-white p-6 rounded-xl shadow-md max-w-lg">
          <h2 className="font-bold mb-4">Mensaje de la Solicitud</h2>
          <p>{mensajeSeleccionado}</p>
          <button
            onClick={() => toggleModal("")}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mt-4"
          >
            Cerrar
          </button>
        </div>
      </div>
    </>
  );
};

export default PanelSolicitudes;
