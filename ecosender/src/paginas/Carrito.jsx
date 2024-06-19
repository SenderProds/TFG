import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Carrito = () => {
  const [productos, setProductos] = useState([]);
  const [precioTotal, setPrecioTotal] = useState(0);
  const navigate = useNavigate();

  const obtenerProductos = async () => {
    let productosLocalStorage = JSON.parse(localStorage.getItem("carrito"));
    const productosCargados = [];

    for (const key in productosLocalStorage) {
      try {
        const response = await fetch(
          `https://ecosender.es/api/productos/obtenerProducto.php?id=${key}`
        );
        const data = await response.json();
        data[0].cantidad = productosLocalStorage[key];
        productosCargados.push(data[0]);
      } catch (error) {
        console.error("Error en la solicitud fetch:", error);
      }
    }

    setProductos(productosCargados);
  };

  useEffect(() => {
    obtenerProductos();
  }, []); // El array vacío hace que el efecto se ejecute solo una vez

  useEffect(() => {
    const calcularPrecioTotal = () => {
      const total = productos.reduce(
        (acc, prod) => acc + prod.precio * prod.cantidad,
        0
      );
      setPrecioTotal(total);
    };

    calcularPrecioTotal();
  }, [productos]);

  /**
   * Suma las unidades de el producto en el carrito
   * @param {*} id Id del producto
   */
  const sumarUnidad = (id) => {
    let productosCarrito = JSON.parse(localStorage.getItem("carrito"));

    productosCarrito[id]++;

    localStorage.setItem("carrito", JSON.stringify(productosCarrito));
    obtenerProductos();
  };

  const restarUnidades = (id) => {
    let productosCarrito = JSON.parse(localStorage.getItem("carrito"));
    productosCarrito[id]--;
    if (productosCarrito[id] < 1) {
      delete productosCarrito[id];
    }
    localStorage.setItem("carrito", JSON.stringify(productosCarrito));
    obtenerProductos();
  };

  const realizarPedido = () => {
    if (localStorage.getItem("carrito")) {
      navigate("/checkout");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Carrito</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {productos.map((prod) => (
            <div
              key={prod.id}
              className="flex items-center bg-white rounded-lg shadow-md p-4 mb-4"
            >
              <img
                className="w-1/4 md:w-1/5 rounded-lg"
                src={prod.img}
                alt={prod.titulo}
              />

              <div className="flex-1 md:mx-4">
                <h2 className="text-lg font-bold mb-2">{prod.titulo}</h2>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <button
                      className="bg-color1 text-white h-8 w-8 rounded-full flex items-center justify-center"
                      onClick={() => restarUnidades(prod.id)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={prod.cantidad}
                      className="text-center border mx-2 w-12"
                      readOnly
                    />
                    <button
                      className="bg-color1 text-white h-8 w-8 rounded-full flex items-center justify-center"
                      onClick={() => sumarUnidad(prod.id)}
                    >
                      +
                    </button>
                  </div>

                  <p className="text-lg font-bold">
                    {prod.precio * prod.cantidad}€
                  </p>
                </div>
              </div>

              <button
                className="text-red-500 hover:text-red-700 ml-2 md:hidden"
                onClick={() => restarUnidades(prod.id)}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-400 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">Resumen del Pedido</h2>
            <p className="font-bold">{precioTotal}€</p>
          </div>

          <button
            className="bg-color1 text-white py-2 px-4 rounded-md hover:bg-white hover:text-color1 hover:border-color1 hover:shadow-md"
            onClick={() => realizarPedido()}
          >
            Realizar Pedido
          </button>
        </div>
        <p className="text-center mt-2">Pago 100% seguro</p>
      </div>
    </div>
  );
};

export default Carrito;
