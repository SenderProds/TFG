import $ from "jquery";




/**
 * Comprueba que el empleado sea correcto y devuelve un jwt que lo 
 * introduce en el localStorage
 * @param {*} e 
 */
export const comprobarEmpleado = (e) => {
    e.preventDefault();
    const url = "https://ecosender.es/api/comprobarEmpleado.php";

    const data = {
        empleado: document.getElementById("usuario").value,
        clave: document.getElementById("clave").value
    };

    $.post(url, data).done((response) => {
        if(response != "false"){

            localStorage.setItem('empleado', response);
            window.location.href = "/empleados";
        }else{
            alert('Empleado Incorrecto');
        }
    })
}


/**
 * Comprueba que el jwt del empleado sea correcto
 * @param {*} jwt 
 * @returns 
 */
export const comprobarJWTEmpleado = (jwt) => {
    const url = "https://ecosender.es/api/comprobarJWTEmpleado.php";
    const data = {
        jwt: jwt
    };

    return new Promise((resolve, reject) => {
        $.post(url, data)
        .done((response) => {

            resolve(response);
        })
        .fail((jqXHR, textStatus, errorThrown) => {
            alert("Se ha producido un error:" + jqXHR);
            reject(errorThrown);
        });
    });
}



export const obtenerRangoEmpleado = (empleadoJWT) => {
    const url = "https://ecosender.es/api/obtenerRangoEmpleado.php";
    const data = {
        jwt: empleadoJWT
    };

    return new Promise((resolve, reject) => {
        $.post(url, data)
        .done((response) => {

            resolve(response);
        })
        .fail((error) => {
            console.error(error);
            reject(error);
        });
    });
}