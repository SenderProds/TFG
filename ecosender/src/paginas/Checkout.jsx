import { useEffect, useState } from "react";
import { Callout, Divider, TextInput, Button } from "@tremor/react";
import $ from "jquery";
import validator from "validator";
import FormularioDatosNecesarios from "../components/FormularioDatosNecesarios";

const Checkout = () => {
  const [idPedido, setIdPedido] = useState();
  const [datosNecesarios, setDatosNecesario] = useState(false);
  const [idUsuario, setIdUsuario] = useState();
  //const [productos, setProductos] = useState([]);



  const realizarPedido = () => {
    console.log("Ejecutando function de realizar pedido");
    let productosCarrito = localStorage.getItem("carrito");
    let jwt = localStorage.getItem("sesion");
    let googleId = localStorage.getItem("googleId");
    const url = "https://ecosender.es/api/realizarPedido.php";

    if (jwt) {
      const data = {
        carrito: productosCarrito,
        jwt: jwt,
      };

      $.post(url, data)
        .done((response) => {
          setIdPedido(response);
          localStorage.removeItem("carrito");
          console.log(response);
        })
        .fail((error) => {
          console.error(error);
        });
    } else {
      const data = {
        carrito: productosCarrito,
        googleId: googleId,
      };

      $.post(url, data).done((response) => {
        setIdPedido(response);
        localStorage.removeItem("carrito");
        console.log(response);
      });
      console.log("Google id");
    }
  };

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


  /**
   * 
   * @param {*} e 
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

  useEffect(() => {
    if (!datosNecesarios) {
      comprobarDatos();
    }
  }, []);

  useEffect(() => {
    console.log(datosNecesarios);
    if (datosNecesarios) {
      realizarPedido();
    } else {
      console.log("Se necesitan datos para realizar el pedido");
    }
  }, [datosNecesarios]);

  return (
    <>
      <div className="h-screen flex flex-col items-center bg-slate-300">
        {datosNecesarios ? (
          <>
            <h1>Se ha realizado el Pedido</h1>
            <h3>Se ha enviado un correo con el resumen del pedido</h3>
            {idPedido ? (
              <>
                <div className="space-y-3">
                  <div className="flex justify-center">
                    <Button variant="primary">
                      <a
                        href={
                          "https://ecosender.es/api/fact/" + idPedido + ".pdf"
                        }
                        target="_blank"
                      >
                        Descargar
                      </a>
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-3">
                  <div className="flex justify-center">
                    <Button variant="primary" loading={true}>
                      Cargando Factura
                    </Button>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <FormularioDatosNecesarios submit={insertarDatos}/>
        )}
      </div>
      
    </>
  );
};

export default Checkout;
