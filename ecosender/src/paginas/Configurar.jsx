import axios from "axios";
import { Divider } from "@tremor/react";
import { useEffect, useState } from "react";
import FormularioDatosNecesarios from "../components/FormularioDatosNecesarios";
import validator from "validator";
import { FcAcceptDatabase } from "react-icons/fc";
import { FcAddDatabase } from "react-icons/fc";
import { Tab, TabGroup, TabList } from "@tremor/react";
import { FcOk } from "react-icons/fc";

const Configurar = () => {
  const [datosNecesarios, setDatosNecesarios] = useState();
  const [datosInsertados, setDatosInsertados] = useState();
  const [idUsuario, setIdUsuario] = useState();

  const [datosCompletado, setDatosCompletado] = useState();
  const [tabSeleccionado, setTabSeleccionado] = useState(1);
  const [panelesSolares, setPanelesSolares] = useState(); //Guarda los paneles solares
  const [panelSeleccionado, setPanelSeleccionado] = useState(); //Guarda el panel seleccionado por el usuario
  const [mostrarSeleccion, setMostrarSeleccion] = useState(); //Muestra el seleccionado de placas solares

  /**
   * Comprueba si estan los datos necesarios del usuario en la base de datos
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

      axios
        .post(url, data, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((response) => {
          console.log(response.data);

          if (response.data != "true") {
            console.log(response.data);
            setIdUsuario(response.data);
            setDatosNecesarios(false);
          } else {
            setDatosNecesarios(true);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (googleId) {
      //Si esta registrado con google
      const data = {
        googleId: googleId,
      };

      axios
        .post(url, data, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((response) => {
          if (response.data != "true") {
            console.log(response.data);
            setIdUsuario(response);
            setDatosNecesarios(false);
          } else {
            setDatosNecesarios(true);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setDatosNecesarios(false);
    }
  };

  /**
   * En el caso que no esten los datos en la base de datos los inserta
   * @param {*} e
   * @returns
   */
  const insertarDatosNecesario = (e) => {
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
    axios
      .post(url, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          setDatosNecesarios(true);
          setDatosInsertados(true);
          setDatosCompletado(true);
        } else {
          console.log(response.data);
          setDatosNecesarios(false);
          setDatosInsertados(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    /*$.post(url, data)
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
      });*/

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

  const obtenerDatosNecesarios = () => {
    console.log(idUsuario);
    const url =
      "http://localhost/TFG/laravel/ecosender-api/public/api/v1/obtenerDatosUsuario?id=" +
      idUsuario;

    axios.get(url).then((response) => console.log(response.data));
  };

  /**
   * Cambia la pestana seleccionada
   * @param {*} tab
   */
  const cambiarTab = (tab) => {
    const tab1 = document.getElementById("tab1");
    const tab2 = document.getElementById("tab2");
    const tab3 = document.getElementById("tab3");

    switch (tab) {
      case 1:
        if (tab2.getAttribute("data-headlessui-state") == "selected") {
          tab2.setAttribute("data-headlessui-state", "");
        }

        tab1.setAttribute("data-headlessui-state", "selected");
        break;
      case 2:
        if (tab1.getAttribute("data-headlessui-state") == "selected") {
          tab1.setAttribute("data-headlessui-state", "");
        }

        setTabSeleccionado(2);
        tab2.setAttribute("data-headlessui-state", "selected");
        console.log("Seleccionado tab2");
        break;
      case 3:
        tab3.setAttribute("data-headlessui-state", "selected");
        break;
    }
  };

  useEffect(() => {
    if (!datosNecesarios) {
      comprobarDatos();
    }
  }, []);

  useEffect(() => {
    if (!panelesSolares) {
      obtenerPanelesSolares();
    } else {
      console.log("Si esta");
    }
  }, []);

  useEffect(() => {}, [obtenerDatosNecesarios()]);


  
  /**
   * Obtiene los paneles solares de la base de datos
   */
  const obtenerPanelesSolares = () => {
    const url =
      "https://ecosender.es/api2/public/api/v1/productosCategoria?categoria=1";
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        setPanelesSolares(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };



  const obtenerIdUsuario = async () => {
    const url = "http://localhost/TFG/laravel/ecosender-api/public/api/v1/obtenerIdUsuario";
    let googleId = localStorage.getItem('googleId');
    let jwt = localStorage.getItem('sesion');
  
    let data = {};
    if (googleId) {
      data = {
        googleId: googleId
      };
    } else if (jwt) {
      data = {
        jwt: jwt
      };
    }
  
    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
      const formData = new URLSearchParams();
      for (let key in data) {
        formData.append(key, data[key]);
      }
  
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-CSRF-TOKEN': csrfToken
        }
      });
  
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  useEffect(() => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    console.log(csrfToken);
    if (csrfToken) {
      obtenerIdUsuario();
    }
  }, []);

  //const url = "https://nominatim.openstreetmap.org/search.php";

  /*axios
    .get(url, {
      params: {
        street: "Ambrosio de vico 4",
        city: "Granada",
        county: "Albolote",
        postalCode: 18220,
        format: "jsonv2",
      },
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });*/

  return (
    <>
      <div className="h-full flex flex-col items-center bg-slate-200">
        <div className="w-2/3 rounded-xl shadow-md text-center bg-white mt-6 p-4">
          <h1 className="font-bold text-xl">
            Bienvenido al configurador de Instalaciones
          </h1>
          <p>
            Desde aqui podras configurar tu instalacion obteniendo valores
            aproximados de produccion y precio de la energia producida.
          </p>
          <Divider></Divider>

          <div>
            <TabGroup>
              <TabList variant="line">
                <Tab value="1" id="tab1" icon={datosCompletado ? FcOk : ""}>
                  1-Datos
                </Tab>
                <Tab value="2" id="tab2">
                  2-Panel
                </Tab>
                <Tab value="3" id="tab3">
                  3-strava.com
                </Tab>
              </TabList>
            </TabGroup>

            {datosNecesarios === false ? (
              <>
                {" "}
                <FormularioDatosNecesarios
                  submit={insertarDatosNecesario}
                  texto="Para continuar necesitamos que proporciones los siguientes datos."
                />
              </>
            ) : (
              <>
                {tabSeleccionado == 1 ? (
                  <>
                    {datosInsertados ? (
                      <>Datos Correctos</>
                    ) : (
                      <>
                        <h1>
                          Hemos comprobado y ya hay una ubicacion establecida en
                          la base de datos
                        </h1>

                        <div className="flex justify-around mt-6">
                          <div
                            className="bg-slate-200 shadow-md p-4 flex flex-col justify-center items-center rounded-xl cursor-pointer hover:bg-color1 hover:text-white transition ease-in-out"
                            onClick={() => {
                              setDatosCompletado(true);
                              cambiarTab(2);
                            }}
                          >
                            Usar esos datos
                            <FcAcceptDatabase className="text-3xl drop-shadow-md" />
                          </div>

                          <div className="bg-slate-200 shadow-md p-4 flex flex-col justify-center items-center rounded-xl cursor-pointer hover:bg-color1 hover:text-white transition ease-in-out">
                            Nueva Ubicacion
                            <FcAddDatabase className="text-3xl drop-shadow-md" />
                          </div>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {tabSeleccionado == 2 ? (
                      <>
                        <h1>Selecciona un Panel Solar</h1>
                        <div className="flex flex-col items-center justify-center">
                          <button
                            className="bg-color1 p-4 mt-4 text-white rounded-xl hover:bg-color2 transition ease-in-out"
                            onClick={() => setMostrarSeleccion(true)}
                          >
                            Seleccionar
                          </button>

                          <>
                            {mostrarSeleccion ? (
                              <>
                                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                                  <div className="bg-white p-4 shadow-md rounded-xl overflow-visible">
                                    <h2 className="font-bold">
                                      Selecciona un Panel Solar
                                    </h2>
                                    {panelesSolares ? (
                                      <>
                                        {panelesSolares.map((panel) => (
                                          <div
                                            key={panel.id}
                                            className="p-4 flex justify-between items-center hover:bg-color1 hover:text-white cursor-pointer bg-slate-200 mt-2 rounded-xl gap-4 transition ease-in-out"
                                            onClick={() => {
                                              setPanelSeleccionado(panel);
                                              setMostrarSeleccion(false);
                                            }}
                                          >
                                            <p>{panel.titulo}</p>
                                            <p>{panel.precio}</p>
                                            <p>
                                              {
                                                JSON.parse(
                                                  panel.caracteristicas
                                                ).potencia
                                              }
                                              W
                                            </p>

                                            <img
                                              src={panel.img}
                                              alt=""
                                              width={50}
                                              className="rounded-xl"
                                            />
                                          </div>
                                        ))}
                                      </>
                                    ) : (
                                      <>Prueba</>
                                    )}
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                {panelSeleccionado ? (
                                  <>
                                    <p className="mt-4">Panel Seleccionado </p>

                                    <div className="bg-slate-300 p-4 rounded-xl shadow-md">
                                      {panelSeleccionado.titulo}
                                    </div>

                                    <div className="mt-4">
                                      <h2>Estadisticas Instalacion</h2>
                                      Coste {panelSeleccionado.precio}
                                      Potencia{" "}
                                      {
                                        panelSeleccionado.caracteristicas
                                          .potencia
                                      }
                                    </div>
                                  </>
                                ) : (
                                  <>Panel no seleccionado</>
                                )}
                              </>
                            )}
                          </>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Configurar;
