import $ from "jquery";

export const obtenerIdCliente = (clienteJWT) => {
    const url = "https://ecosender.es/api/obtenerIdCliente.php";
    const data = {
        jwt: clienteJWT
    };

    return new Promise((resolve, reject) => {
        $.post(url, data)
        .done((response) => {
            console.log(response);
            resolve(response);
        })
        .fail((error) => {
            console.error(error);
            reject(error);
        });
    });
};