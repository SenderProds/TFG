import { useEffect, useState } from "react";
import { Callout, Divider, TextInput, Button } from "@tremor/react";
import $ from "jquery";
import validator from "validator";

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
          <div className="p-4 mt-5 bg-white rounded-lg shadow-md flex flex-col items-center">
            <Callout className="h-24" title="Datos Necesarios" color="emerald">
              Para poder continuar con el pedido es necesario que introduzcas
              los siguientes datos.
            </Callout>

            <div className="sm:mx-auto sm:max-w-2xl">
              <form onSubmit={insertarDatos} method="post" className="mt-8">
                <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
                  <div className="col-span-full sm:col-span-3">
                    <label
                      htmlFor="nombre"
                      className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                    >
                      Nombre
                      <span className="text-red-500">*</span>
                    </label>
                    <TextInput
                      type="text"
                      id="nombre"
                      name="nombre"
                      autoComplete="Nombre"
                      placeholder="Nombre"
                      className="mt-2"
                      required
                    />
                  </div>
                  <div className="col-span-full sm:col-span-3">
                    <label
                      htmlFor="apellidos"
                      className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                    >
                      Apellidos
                      <span className="text-red-500">*</span>
                    </label>
                    <TextInput
                      type="text"
                      id="apellidos"
                      name="apellidos"
                      autoComplete="Apellidos"
                      placeholder="Apellidos"
                      className="mt-2"
                      required
                    />
                  </div>

                  <div className="col-span-full sm:col-span-3">
                    <label
                      htmlFor="dni"
                      className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                    >
                      DNI
                      <span className="text-red-500">*</span>
                    </label>
                    <TextInput
                      type="text"
                      id="dni"
                      name="dni"
                      autoComplete="DNI"
                      placeholder="DNI"
                      className="mt-2"
                      required
                    />
                  </div>
                  <div className="col-span-full sm:col-span-3">
                    <label
                      htmlFor="telefono"
                      className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                    >
                      Telefono (+34)
                      <span className="text-red-500">*</span>
                    </label>
                    <TextInput
                      type="text"
                      id="telefono"
                      name="telefono"
                      autoComplete="Telefono"
                      placeholder="Telefono"
                      className="mt-2"
                      required
                    />
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="direccion"
                      className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                    >
                      Direccion
                      <span className="text-red-500">*</span>
                    </label>
                    <TextInput
                      type="text"
                      id="direccion"
                      name="direccion"
                      autoComplete="street-address"
                      placeholder="Direccion"
                      className="mt-2"
                      required
                    />
                  </div>
                  <div className="col-span-full sm:col-span-3">
                    <label
                      htmlFor="ciudad"
                      className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                    >
                      Ciudad
                      <span className="text-red-500">*</span>
                    </label>
                    <TextInput
                      type="text"
                      id="ciudad"
                      name="ciudad"
                      autoComplete="address-level2"
                      placeholder="Ciudad"
                      className="mt-2"
                      required
                    />
                  </div>

                  <div className="col-span-full sm:col-span-3">
                    <label
                      htmlFor="codigoPostal"
                      className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                    >
                      Codigo Postal
                      <span className="text-red-500">*</span>
                    </label>
                    <TextInput
                      id="codigoPostal"
                      name="codigoPostal"
                      autoComplete="Codigo Postal"
                      placeholder="Codigo Postal"
                      className="mt-2"
                      required
                    />
                  </div>
                </div>
                <Divider />

                <div className="flex items-center justify-end space-x-4">
                  <button
                    type="submit"
                    className="whitespace-nowrap rounded-tremor-default bg-tremor-brand px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis"
                  >
                    Continuar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      ;
    </>
  );
};

export default Checkout;
