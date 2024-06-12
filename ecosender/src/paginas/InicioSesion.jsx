import { GoogleLogin } from "@react-oauth/google";
import { comprobarLogin, registro } from "../utilidades/sesion";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
// 'use client';
import { Divider, TextInput, Tab, TabGroup, TabList } from "@tremor/react";
import { useEffect } from "react";

//import { useState } from 'react';

const InicioSesion = () => {
  const navigate = useNavigate();
  useEffect(() => {
    //navigate("/cuenta");
  }, [localStorage.getItem("sesion")]);

  const responseMessage = (googleData) => {
    const url = "https://ecosender.es/api/decode.php";
    const data = {
      jwt: googleData.credential,
    };

    $.post(url, data).done((response) => {
      if (response != "false") {
        localStorage.setItem("googleId", response);
        window.location.href = "/cuenta";
      }
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
        <section className="bg-color1 rounded-lg shadow-xl p-4 w-5/6 sm:w-96">
          <TabGroup>
            <TabList variant="solid" defaultValue="1">
              <Tab value="1" onClick={mostrarInicioSesion}>
                Iniciar Sesion
              </Tab>
              <Tab value="2" onClick={mostrarRegistro}>
                Registrarse
              </Tab>
            </TabList>
          </TabGroup>

          {/*FORMULARIO DE INICIO DE SESION*/}

          <div
            className="flex min-h-full flex-1 flex-col px-4 lg:px-6"
            id="formularioInicioSesion"
          >
            <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
              <form
                onSubmit={comprobarLogin}
                method="post"
                className="w-full"
                id=""
              >
                <label
                  htmlFor="email"
                  className="text-tremor-default font-medium text-white "
                >
                  Nombre de Usuario
                </label>
                <TextInput
                  type="text"
                  id="usuario"
                  name="usuario"
                  autoComplete="usuario"
                  placeholder="Nombre de Usuario"
                  className="mt-2"
                />

                <label
                  htmlFor="email"
                  className="text-tremor-default font-medium text-white dark:text-dark-tremor-content-strong"
                >
                  Clave
                </label>
                <TextInput
                  type="password"
                  id="clave"
                  name="clave"
                  autoComplete="clave"
                  placeholder="Clave"
                  className="mt-2"
                />
                <button
                  type="submit"
                  className="mt-4 w-full whitespace-nowrap rounded-tremor-default bg-tremor-brand py-2 text-center text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis"
                >
                  Iniciar Sesion
                </button>
              </form>
              <Divider className="text-white">o autenticación con</Divider>
              <GoogleLogin
                onSuccess={responseMessage}
                onError={errorMessage}
                className="w-full flex justify-center"
                size="large"
                theme="filled"
                logo_alignment="center"
                text="signin_with"
              />
              <p className="mt-4 text-tremor-label text-white p-2">
                By signing in, you agree to our{" "}
                <a href="#" className="underline underline-offset-4">
                  terms of service
                </a>{" "}
                and{" "}
                <a href="#" className="underline underline-offset-4">
                  privacy policy
                </a>
                .
              </p>
            </div>
          </div>

          {/*FORMULARIO DE REGISTRO*/}

          <div className="flex min-h-full flex-1 flex-col px-4 lg:px-6">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
              <form
                onSubmit={registro}
                method="post"
                className="w-full hidden"
                id="formularioRegistro"
              >
                <label
                  htmlFor="correoReg"
                  className="text-tremor-default font-medium text-white "
                >
                  Correo
                </label>
                <TextInput
                  type="email"
                  id="correoReg"
                  name="correoReg"
                  autoComplete="Correo"
                  placeholder="Correo"
                  className="mt-2"
                />

                <label
                  htmlFor="nombreUsuarioReg"
                  className="text-tremor-default font-medium text-white dark:text-dark-tremor-content-strong"
                >
                  Nombre de Usuario
                </label>
                <TextInput
                  type="text"
                  id="nombreUsuarioReg"
                  name="nombreUsuarioReg"
                  autoComplete="Nombre de Usuario"
                  placeholder="Nombre de Usuario"
                  className="mt-2"
                />

                <label
                  htmlFor="claveReg"
                  className="text-tremor-default font-medium text-white dark:text-dark-tremor-content-strong"
                >
                  Clave
                </label>
                <TextInput
                  type="password"
                  id="claveReg"
                  name="claveReg"
                  autoComplete="clave"
                  placeholder="Clave"
                  className="mt-2"
                />
                <button
                  type="submit"
                  className="mt-4 w-full whitespace-nowrap rounded-tremor-default bg-tremor-brand py-2 text-center text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis"
                >
                  Registrarse
                </button>
              </form>
            </div>
          </div>

          
        </section>
      </div>
    </>
  );
};

export default InicioSesion;
