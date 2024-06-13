//import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { Button, Divider, Textarea } from "@tremor/react";
import { Select, SelectItem } from "@tremor/react";
import PruebaImagen from "../components/PruebaImagen";
import validator from "validator";
import $ from "jquery";
import FormularioDatosNecesarios from "../components/FormularioDatosNecesarios";

const SolicitarServicio = () => {
  const [servicioSeleccionado, setServicioSeleccionado] = useState();
  const [idUsuario, setIdUsuario] = useState();
  const [datosNecesarios, setDatosNecesario] = useState();

  /**
   * Inserta los datos del usuario en la base de datos
   * Se guarda el id de usuario
   * @param {*} e Evento
   * @returns
   */
  const insertarDatos = (e) => {
    e.preventDefault();

    let nombre = document.getElementById("nombre").value.trim();
    let apellidos = document.getElementById("apellidos").value.trim();
    let dni = document.getElementById("dni").value.trim();
    let telefono = document.getElementById("telefono").value.trim();
    let direccion = document.getElementById("direccion").value.trim();
    let ciudad = document.getElementById("ciudad").value.trim();
    let codigoPostal = document.getElementById("codigoPostal").value.trim();

    const errores = {};

    if (validator.isEmpty(nombre)) {
      errores.nombre = "El nombre es obligatorio";
    }

    if (validator.isEmpty(apellidos)) {
      errores.apellidos = "Los apellidos son obligatorios";
    }

    if (!validator.matches(dni, /^\d{8}[A-Za-z]$/)) {
      errores.dni = "DNI no válido";
      //document.getElementById('dni').error = true;
    }

    if (!validator.isMobilePhone(telefono, "es-ES")) {
      errores.telefono = "Teléfono no válido";
    }

    if (validator.isEmpty(direccion)) {
      errores.direccion = "La dirección es obligatoria";
    }

    if (validator.isEmpty(ciudad)) {
      errores.ciudad = "La ciudad es obligatoria";
    }

    if (!validator.isPostalCode(codigoPostal, "ES")) {
      errores.codigoPostal = "Código postal no válido";
    }

    if (Object.keys(errores).length > 0) {
      console.log("Errores en el formulario:", errores);
      alert(
        "Hay errores en el formulario. Por favor, corrígelos e intenta nuevamente."
      );
      return;
    }

    const url = "https://ecosender.es/api/insertarDatos.php";

    const data = {
      id: idUsuario,
      nombre: nombre,
      apellidos: apellidos,
      dni: dni,
      telefono: telefono,
      direccion: direccion,
      ciudad: ciudad,
      codigoPostal: codigoPostal,
    };

    $.post(url, data)
      .done((response) => {
        if (response) {
          console.log(response);
          setDatosNecesario(true);
        } else {
          console.log(response);
          setDatosNecesario(false);
        }
      })
      .fail((error) => {
        console.log(error);
      });
    console.log(
      nombre,
      apellidos,
      dni,
      telefono,
      direccion,
      ciudad,
      codigoPostal
    );
  };

  /**
   * Obtiene el servicio que hay en el localStorage
   * Una vez obtenido lo quita de localStorage
   */
  useEffect(() => {
    let servicio = localStorage.getItem("servicio");
    if (servicio) {
      console.log(servicio);
      setServicioSeleccionado(servicio);
      localStorage.removeItem("servicio");
    }
  });

  const enviarSolicitud = (e) => {
    e.preventDefault();
  };

  /**
   * Comprueba que estan todos los datos del usuario correctamente
   */
  const comprobarDatos = () => {
    let jwt = localStorage.getItem("sesion");
    let googleId = localStorage.getItem("googleId");
    const url = "https://ecosender.es/api/comprobarDatos.php";

    if (jwt) {
      //Si esta registrado manualmente
      const data = {
        jwt: jwt,
      };

      $.post(url, data)
        .done((response) => {
          console.log(response);
          if (response != "true") {
            console.log(response);
            setIdUsuario(response);
            setDatosNecesario(false);
          } else {
            setDatosNecesario(true);
          }
        })
        .fail((error) => {
          console.error(error);
        });
    } else if (googleId) {
      //Si esta registrado con google
      const data = {
        googleId: googleId,
      };

      $.post(url, data)
        .done((response) => {
          if (response != "true") {
            console.log(response);
            setIdUsuario(response);
            setDatosNecesario(false);
          } else {
            setDatosNecesario(true);
          }
        })
        .fail((error) => {
          console.error(error);
        });
    } else {
      setDatosNecesario(false);
    }
  };

  useEffect(() => {
    if (!datosNecesarios) {
      comprobarDatos();
    }
  }, []);

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center bg-slate-200">
        {datosNecesarios ? (
          <div className="rounded-xl w-2/4 shadow-md text-center bg-white p-4 flex flex-col items-center">
            <h1 className="font-bold text-2xl">Solicitud de Servicio</h1>
            <p>
              Completa el siguiente formulario para solicitar nuestros
              servicios.
            </p>

            <Divider>Servicio</Divider>

            <form
              onSubmit={enviarSolicitud}
              className="w-2/3 flex flex-col justify-center items-center"
            >
              {servicioSeleccionado ? (
                //Formularo de solicitud de servicio
                <Select
                  defaultValue={servicioSeleccionado}
                  className="w-2/3"
                  id="servicioSeleccionado"
                >
                  <SelectItem
                    value="1"
                    className="flex justify-between gap-2 cursor-pointer hover:bg-black"
                    icon={PruebaImagen}
                  >
                    Planificacion
                  </SelectItem>
                  <SelectItem
                    value="2"
                    className="flex justify-between gap-2"
                    icon={PruebaImagen}
                  >
                    Instalaciones
                  </SelectItem>
                  <SelectItem
                    value="3"
                    className="flex justify-between gap-2"
                    icon={PruebaImagen}
                  >
                    Mantenimiento
                  </SelectItem>
                </Select>
              ) : (
                <></>
              )}


              <Divider>Formulario</Divider>

              <label htmlFor="">Explique</label>
              <Textarea
                id="descripcion"
                placeholder="Escribe Aqui..."
                className="mx-auto max-w-xs"
              />

              <Button variant="primary" type="submit">
                Enviar Solicitud
              </Button>
            </form>

            <div></div>
          </div>
        ) : (
          //Formulario de datos necesarios
          <FormularioDatosNecesarios submit={insertarDatos} />
        )}
      </div>
    </>
  );
};

export default SolicitarServicio;
