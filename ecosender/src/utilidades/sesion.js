
import $, { error } from "jquery";

/**
 * Comprueba si el usuario introducido por post es correcto
 * y esta registrado en la base de datos, si cumple con esto
 * devuelve un jwt para la sesion
 * @param {*} e
 */
export const comprobarLogin = (e) => {
  e.preventDefault();
  const url = "https://ecosender.es/api/login/comprobarUsuario.php";

  const data = {
    user: document.getElementById("usuario").value,
    clave: document.getElementById("clave").value,
  };

  $.post(url, data).done((response) => {
    if (response != "false") {
      console.log("Sesion Iniciada");
      localStorage.setItem("sesion", response);
      window.location.href = "/cuenta";
    } else {
      console.log("Sesion Incorrecta");
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
    const url = "https://ecosender.es/api/login/registro.php";
    const data = {
      correo: correo,
      nombreUsuario: nombreUsuario,
      clave: clave,
    };

    $.post(url, data).done((response) => {
      if (response == "true") {
        console.log("Usuario registrado");
        window.location.href = "/inicioSesion";
      } else {
        console.log("El usuario no se ha registro");
      }
    });
  } else {
    alert("Tiene que completar todos los campos");
  }
};



/**
 * Comprueba el token JWT para comprobar que sea legitimo
 */
export async function comprobarJWT(jwt) {
  const url = "https://ecosender.es/api/comprobarJWT.php";
  const data = {
    jwt: jwt,
  };

  return new Promise((resolve, reject) => {
    $.post(url, data)
      .done((response) => {
        console.log(response);
        resolve(response);
      })
      .fail((jqXHR, textStatus, errorThrown) => {
        console.log(jqXHR);
        reject(errorThrown); // Rechaza la promesa en caso de error
      });
  });
}

export async function comprobarGoogleId(googleId){
  const url = "https://ecosender.es/api/comprobarGoogleId.php";
  const data = {
    googleId: googleId,
  };

  return new Promise((resolve, reject) => {
    $.post(url, data)
    .done((response) => {
      console.log(response);
      resolve(response);
    })
    .fail((error) => {
      console.log(error);
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
