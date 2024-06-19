import $ from "jquery";

export const obtenerIdCliente = (clienteJWT) => {
    const url = "https://ecosender.es/api/obtenerIdCliente.php";
    const data = {
        jwt: clienteJWT
    };

    return new Promise((resolve, reject) => {
        $.post(url, data)
        .done((response) => {

            resolve(response);
        })
        .fail((error) => {

            reject(error);
        });
    });
};