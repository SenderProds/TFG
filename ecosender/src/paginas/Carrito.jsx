import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Carrito = () => {
  const [productos, setProductos] = useState([]);
  const [precioTotal, setPrecioTotal] = useState(0);
  const navigate = useNavigate();

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
    if(productosCarrito[id] < 1){
      delete productosCarrito[id];
    }
    localStorage.setItem("carrito", JSON.stringify(productosCarrito));
    obtenerProductos();
  };

  const realizarPedido = () => {
    if (localStorage.getItem("carrito")) {
      navigate("/checkout");
      console.log("Realizando Pedido");
    }
  };
  return (
    <>
      <h1>Carrito</h1>

      <div className="flex">
        <div className="w-4/6">
          {productos.map((prod) => (
            <div key={prod.id} className="w-full flex justify-around h-48">
              <img
                className="w-1/5 "
                src={prod.img}
                alt=""
                height={50}
                width={50}
              />

              <div className="w-3/5 flex flex-col justify-around ">
                <div className="w-4/4 flex">
                  <h1 className="w-3/4">{prod.titulo}</h1>
                  <div className="w-1/4">
                    <h1>Eliminar producto</h1>
                  </div>
                </div>

                <div className="flex justify-around">
                  {/*Cantidad de productos */}
                  <div className="flex justify-around">
                    <button
                      className="bg-color1  h-10 w-10 text-white"
                      onClick={() => restarUnidades(prod.id)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={prod.cantidad}
                      className="text-center border"
                    />
                    <button
                      className="bg-color1 h-10 w-10 text-white"
                      onClick={() => sumarUnidad(prod.id)}
                    >
                      +
                    </button>
                  </div>

                  {/*Precio Total*/}
                  <p>{prod.precio * prod.cantidad}€</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-2/6">
          <div className="bg-slate-400 w-5/6 text-center">
            <h1>
              Total <span className="font-bold">{precioTotal}€</span>
            </h1>
            <h3>Impuestos Incluidos</h3>

            <button
              className="bg-color1 text-white p-2"
              onClick={() => realizarPedido()}
            >
              Realizar Pedido
            </button>
            <p>Pago 100% seguro</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carrito;
