/*const comprobarSesion = () => {

}*/
import $ from "jquery";

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
        resolve(response);
      })
      .fail((jqXHR, textStatus, errorThrown) => {
        reject(errorThrown); // Rechaza la promesa en caso de error
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

  /*$.post(url, data)
    .done((response) => {
      console.log(response);
    })*/

  //return googleData.credential;

  /*
    const onSuccess = async (googleData) => {
      try {
        // Extraer el token de acceso del objeto googleData
        const { credential } = googleData;
  
        // Decodificar el token JWT para obtener la información del usuario
        const decodedToken = jwtDecode(credential);
  
        // Extraer el nombre de usuario del token decodificado
        const username = decodedToken.given_name;
  
        // Devolver el nombre de usuario
        return username;
      } catch (error) {
        console.error('Error al obtener el nombre de usuario:', error);
        return null; // En caso de error, devuelve null o maneja el error según sea necesario
      }
    };
  
    // Llama a la función onSuccess con el objeto googleData y devuelve su resultado
    return onSuccess(googleData);*/
}
