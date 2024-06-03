import React, { useEffect, useState } from "react";

const Carrito = () => {
  const [productos, setProductos] = useState([]);

  const obtenerProductos = async () => {
    console.log("Esto es una prueba de obtener los productos del carrito");

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
    console.log(productosCargados);
  };

  useEffect(() => {
    obtenerProductos();
  }, []); // El array vacío hace que el efecto se ejecute solo una vez



  /**
   * Suma las unidades de el producto en el carrito
   * @param {*} id Id del producto
   */
  const sumarUnidad = (id) => {
    let productosCarrito = JSON.parse(localStorage.getItem('carrito'));

    productosCarrito[id]++;

    localStorage.setItem('carrito', JSON.stringify(productosCarrito));
    obtenerProductos();
  }


  const restarUnidades = (id) => {
    let productosCarrito = JSON.parse(localStorage.getItem('carrito'));
    productosCarrito[id]--;
    localStorage.setItem('carrito', JSON.stringify(productosCarrito));
    obtenerProductos();
  }
  return (
    <>
      <h1>Carrito</h1>
      <div className="">
        {productos.map((prod) => (
          <div key={prod.id} className="w-full flex justify-around">
            <img
              className="w-1/5 "
              src={prod.img}
              alt=""
              height={96}
              width={96}
            />

            <div className="w-4/5">
              <div className="w-4/4 flex">
                <h1 className="w-3/4">{prod.titulo}</h1>
                <div className="w-1/4">
                  <h1>Eliminar producto</h1>
                </div>
              </div>

              <div className="flex justify-around">
                {/*Cantidad de productos */}
                <div className="flex justify-around">
                  
                  <button className="bg-color1  h-10 w-10 text-white" onClick={() => restarUnidades(prod.id)}>-</button>
                  <input type="number" value={prod.cantidad} className="text-center border"/>
                  <button className="bg-color1 h-10 w-10 text-white" onClick={() => sumarUnidad(prod.id)}>+</button>
                  
                  
                </div>

                {/*Precio Total*/}
                <p>{prod.precio * prod.cantidad}€</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Carrito;
