
import $, { error } from "jquery";
import axios from "axios";

/**
 * Comprueba si el usuario introducido por post es correcto
 * y esta registrado en la base de datos, si cumple con esto
 * devuelve un jwt para la sesion
 * @param {*} e
 */
export const comprobarLogin = (e) => {
  e.preventDefault();
  const url = "https://ecosender.es/api2/public/api/v1/comprobarUsuario";

  const data = {
    nombreUsuario: document.getElementById("usuario").value,
    clave: document.getElementById("clave").value,
  };

  $.post(url, data).done((response) => {
    if (response != "false") {


      localStorage.setItem("sesion", response);
      window.location.href = "/cuenta";
    } else {
      alert("Sesion Incorrecta");
    }
  });
};

/**
 * Registra un nuevo usuario
 * @param {*} e
 */
export const registro = (e) => {
  e.preventDefault();
  let correo = document.getElementById("correoReg").value;
  let nombreUsuario = document.getElementById("nombreUsuarioReg").value;
  let clave = document.getElementById("claveReg").value;

  if (correo && nombreUsuario && clave) {
    //const url = "https://ecosender.es/api/login/registro.php";
    const url = "https://ecosender.es/api2/public/api/v1/agregarUsuario";

    const data = {
      correo: correo,
      nombreUsuario: nombreUsuario,
      clave: clave,
    };

    
    axios.post(url, data).then((response) => {
      if (response.data != "false") {

        window.location.href = "/inicioSesion";
      } else {
        alert("El usuario no se ha registro", response.data);
      }
    }).catch((error) => {
      alert("No es posible registrar el usuario, comprueba que todos los campos estan correctos.");
    });
    


  } else {
    alert("Tiene que completar todos los campos");
  }
};



/**
 * Comprueba el token JWT para comprobar que sea legitimo
 */
export async function comprobarJWT(jwt) {
  const url = "https://ecosender.es/api2/public/api/v1/comprobarJWT";
  const data = {
    jwt: jwt,
  };

  return new Promise((resolve, reject) => {
    $.post(url, data)
      .done((response) => {

        resolve(response);
      })
      .fail((jqXHR, textStatus, errorThrown) => {
        console.error(jqXHR);
        reject(errorThrown); // Rechaza la promesa en caso de error
      });
  });
}

export async function comprobarGoogleId(googleId){
  const url = "https://ecosender.es/api2/public/api/v1/comprobarGoogleId";
  const data = {
    googleId: googleId,
  };

  return new Promise((resolve, reject) => {
    $.post(url, data)
    .done((response) => {
      resolve(response);
    })
    .fail((error) => {
      alert("Se ha producido un error: " + error);
      reject(error);
    });
  });
}


export async function obtenerUsuario(googleData) {
  const url = "https://ecosender.es/api/decode.php";
  const data = {
    jwt: googleData.credential,
  };
  return new Promise((resolve, reject) => {
    $.post(url, data)
      .done((response) => {
        resolve(response);
      })
      .fail((jqXHR, textStatus, errorThrown) => {
        reject(errorThrown);
      });
  });


}
