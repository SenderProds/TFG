
import axios from "axios";
import { useEffect, useState } from "react";

const PanelSolicitudes = () => {
  const url =
    "https://ecosender.es/api2/public/api/v1/solicitudes";
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        setSolicitudes(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      {solicitudes.length > 0 ? (
        solicitudes.map((solicitud) => (
          <p key={solicitud.id}>{solicitud.mensaje}</p>
        ))
      ) : (
        <p>No hay solicitudes</p>
      )}
    </>
  );
};

export default PanelSolicitudes;
