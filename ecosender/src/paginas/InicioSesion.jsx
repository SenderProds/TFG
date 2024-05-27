import { GoogleLogin } from "@react-oauth/google";
import { comprobarLogin , registro, obtenerUsuario } from "../utilidades/sesion";
import $ from "jquery";

//import { useState } from 'react';

const InicioSesion = () => {
  const responseMessage = (googleData) => {
    const url = "https://ecosender.es/api/decode.php";
    const data = {
      jwt: googleData.credential,
    };

    $.post(url, data).done((response) => {
      console.log(response);
    });
  };

  const errorMessage = (error) => {
    console.log(error);
  };

  /**
   * Muestra el formulario de registro
   */
  const mostrarRegistro = () => {
    let login = document.getElementById("formularioInicioSesion");
    let registro = document.getElementById("formularioRegistro");

    if (!login.classList.contains("hidden")) {
      login.classList.add("hidden");

      if (registro.classList.contains("hidden")) {
        registro.classList.remove("hidden");
      }
    }

    login.classList.add("hidden");
    registro.classList.remove("hidden");
  };

  /**
   * Muestra el formulario de inicio de sesion
   */
  const mostrarInicioSesion = () => {
    console.log("Boton de inicio de sesion");
    let formularioLogin = document.getElementById("formularioInicioSesion");
    let formularioRegistro = document.getElementById("formularioRegistro");

    if (formularioLogin.classList.contains("hidden")) {
      formularioLogin.classList.remove("hidden");

      if (!formularioRegistro.classList.contains("hidden")) {
        formularioRegistro.classList.add("hidden");
      }
    }
  };



  return (
    <>
      <div className="w-full h-full text-center flex flex-col justify-center items-center">
        <section className="bg-color1 h-2/5 w-96 rounded-lg shadow-xl">
          <nav>
            <ul className="flex p-2">
              <li className="bg-white p-2 rounded-t-lg m-1 hover:scale-105 cursor-pointer transition ease-in-out">
                <button id="btnIniciarSesion" onClick={mostrarInicioSesion}>
                  Iniciar Sesion
                </button>
              </li>
              <li className="bg-white p-2 rounded-t-lg m-1 hover:scale-105 cursor-pointer transition ease-in-out">
                <button id="btnRegistro" onClick={mostrarRegistro}>
                  Registro
                </button>
              </li>
            </ul>
          </nav>

          {/*FORMULARIO DE INICIO DE SESION*/}
          <form
            onSubmit={comprobarLogin}
            className="flex flex-col justify-center items-center text-white transition ease-in-out"
            id="formularioInicioSesion"
          >
            <label htmlFor="usuario">Nombre de usuario</label>
            <input
              type="text"
              name="usuario"
              id="usuario"
              className="text-black text-center w-3/4 rounded-3xl h-9 m-2"
              style={{ color: "black" }}
              autoComplete="off"
              required
            />

            <label htmlFor="clave">Clave</label>
            <input
              type="password"
              name="clave"
              id="clave"
              className="text-black text-center w-3/4 rounded-3xl h-9 m-2"
              required
            />

            <input
              type="submit"
              value="Acceder"
              className="w-3/4 rounded-3xl h-9 m-2 border border-white hover:bg-color2 transition ease-in-out cursor-pointer"
            />
            <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
          </form>



          {/*FORMULARIO DE REGISTRO*/}
          <form
            onSubmit={registro}
            id="formularioRegistro"
            className="flex flex-col justify-center items-center text-white hidden"
          >

            {/*Correo Electronico del Usuario*/}
            <label htmlFor="correo">Correo Electronico</label>
            <input
              type="email"
              name="correoReg"
              id="correoReg"
              className="text-black text-center w-3/4 rounded-3xl h-9 m-2"
              autoComplete="off"
              required
            />

            {/*Nombre del Usuario*/}
            <label htmlFor="nombreUsuario">Nombre de Usuario</label>
            <input
              type="text"
              name="nombreUsuarioReg"
              id="nombreUsuarioReg"
              className="text-black text-center w-3/4 rounded-3xl h-9 m-2"
              autoComplete="off"
              required
            />

            {/*Clave de usuario*/}
            <label htmlFor="clave">Clave de Usuario</label>
            <input
              type="password"
              name="claveReg"
              id="claveReg"
              className="text-black text-center w-3/4 rounded-3xl h-9 m-2"
              required
           />

            <input
              type="submit"
              value={"Registrarse"}
              className="w-3/4 rounded-3xl h-9 m-2 border border-white hover:bg-color2 transition ease-in-out cursor-pointer"
            />
          </form>
        </section>
      </div>
    </>
  );
};

export default InicioSesion;
