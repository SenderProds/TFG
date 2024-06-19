import React, { useState, useEffect } from "react";
import axios from "axios";
import { comprobarJWT, comprobarGoogleId } from "../utilidades/sesion";
import { agregarAlCarrito } from "../utilidades/carrito";
import Producto from "../components/Producto";
import Modal from "../components/Modal";
import BtnCategorias from "../components/BtnCategorias";
import BtnCarrito from "../components/BtnCarrito";
import BtnAtencionAlCliente from "../components/BtnAtencionAlCliente";
import { FiChevronsRight } from "../components/Iconos";
import { FiChevronsLeft } from "react-icons/fi";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [categoria, setCategoria] = useState(1);
  const [numeroProductosCarrito, setNumeroProductosCarrito] = useState(0);
  const [desplegarMenu, setDesplegarMenu] = useState(false);
  const [ocultarMenu, setOcultarMenu] = useState(true);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [unidadesParaAgregar, setUnidadesParaAgregar] = useState(1);

  const actualizarProductosCarrito = () => {
    let productosCarrito = JSON.parse(localStorage.getItem("carrito")) || {};
    let numeroProductos = Object.values(productosCarrito).reduce(
      (acc, curr) => acc + curr,
      0
    );
    setNumeroProductosCarrito(numeroProductos);
  };

  useEffect(() => {
    if (localStorage.getItem("carrito")) {
      actualizarProductosCarrito();
    }
  }, []);

  const urlApi =
    "https://ecosender.es/api2/public/api/v1/productosCategoria?categoria=" +
    categoria;

  const urlApiCategorias = "https://ecosender.es/api2/public/api/v1/categorias";

  useEffect(() => {
    axios
      .get(urlApiCategorias)
      .then((response) => {
        setCategorias(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(urlApi)
      .then((response) => {
        setProductos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [categoria]);

  const clickCarrito = (producto) => {
    const loggingStatus = localStorage.getItem("sesion");
    const googleId = localStorage.getItem("googleId");

    const agregarProductoAlCarrito = () => {
      
      
      if(unidadesParaAgregar){
        setNumeroProductosCarrito(numeroProductosCarrito + unidadesParaAgregar);

      }else{
        setNumeroProductosCarrito(numeroProductosCarrito + 1);
      }

      agregarAlCarrito(producto.id);
    };

    if (loggingStatus) {
      comprobarJWT(loggingStatus)
        .then((respuesta) => {
          if (respuesta === "false") {
            setShowModal(true);
          } else {
            agregarProductoAlCarrito();
            setUnidadesParaAgregar(1);
          }
        })
        .catch((error) => {
          console.error("Error comprobando el JWT:", error);
        });
    } else if (googleId) {
      comprobarGoogleId(googleId)
        .then((respuesta) => {
          if (respuesta === "false") {
            setShowModal(true);
          } else {
            agregarProductoAlCarrito();
            setUnidadesParaAgregar(1);

          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const clickCategoria = (id) => {
    setCategoria(id);
  };

  const desplegarMenuMovil = () => {
    setOcultarMenu(false);
    setTimeout(() => {
      setDesplegarMenu(true);
    }, 200);
  };

  const ocultarMenuMovil = () => {
    setDesplegarMenu(false);
    setTimeout(() => {
      setOcultarMenu(true);
    }, 200);
  };

  const mostrarDetalleProducto = (producto) => {
    setProductoSeleccionado(producto);
  };

  const cerrarDetalleProducto = () => {
    setProductoSeleccionado(null);
  };


  const obtenerUnidades = (e) => {

    setUnidadesParaAgregar(parseInt(e.target.value, 10));
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-around">
        <div className="fixed left-0 p-2 bg-color1 shadow-xl rounded-r-3xl z-30 mt-3 text-3xl text-white md:hidden cursor-pointer">
          {desplegarMenu ? (
            <FiChevronsLeft onClick={ocultarMenuMovil} />
          ) : (
            <FiChevronsRight onClick={desplegarMenuMovil} />
          )}
        </div>
        <div
          id="panelLateralProductos"
          className={`${
            desplegarMenu ? "translate-x-0" : "-translate-x-full"
          } ${
            ocultarMenu ? "hidden" : "block"
          } md:block md:translate-x-0 fixed flex flex-col justify-center items-center md:items-start w-full md:static top-0 left-0 md:w-1/6 bg-white mt-6 md:flex  z-20 h-full md:pr-4 transition ease-in-out duration-200`}
        >
          <h3 className="bg-color1 w-3/4 md:w-full p-2 text-white md:rounded-r-3xl  text-center mb-4 font-bold font-roboto">
            Categorias
          </h3>

          {categorias.map((cat) => (
            <BtnCategorias
              key={cat.idCategoria}
              nombre={cat.NombreCategoria}
              onClick={() => {
                clickCategoria(cat.idCategoria);
                ocultarMenuMovil();
              }}
            />
          ))}
        </div>

        <div className="w-6/6  md:w-5/6 flex flex-col justify-center items-center bg-slate-300">
          <div
            id="contenedorProductos"
            className="flex flex-wrap justify-center gap-8 mt-6 min-h-screen z-0 mb-5 overflow-y-scroll"
            data-categoria="1"
          >
            {productos.map((prod) => (
              <Producto
                key={prod.id}
                titulo={prod.titulo}
                precio={prod.precio}
                img={prod.img}
                detalle={() => mostrarDetalleProducto(prod)}
                agregarCarrito={() => clickCarrito(prod)}
              />
            ))}
          </div>

          <div className="mt-6 flex shadow-md rounded-lg w-2/6 justify-center hidden">
            <button className="bg-color1 text-white p-3 m-2 rounded-md transition ease-in-out hover:bg-white hover:scale-105 border hover:border-color1 hover:text-color1 hover:shadow-md">
              &#60;
            </button>
            <button className="bg-color1 text-white p-3 m-2 rounded-md transition ease-in-out hover:bg-white hover:scale-105 border hover:border-color1 hover:text-color1 hover:shadow-md">
              1
            </button>
            <button className="bg-color1 text-white p-3 m-2 rounded-md transition ease-in-out hover:bg-white hover:scale-105 border hover:border-color1 hover:text-color1 hover:shadow-md">
              2
            </button>
            <button className="bg-color1 text-white p-3 m-2 rounded-md transition ease-in-out hover:bg-white hover:scale-105 border hover:border-color1 hover:text-color1 hover:shadow-md">
              3
            </button>
            <button className="bg-color1 text-white p-3 m-2 rounded-md transition ease-in-out hover:bg-white hover:scale-105 border hover:border-color1 hover:text-color1 hover:shadow-md">
              4
            </button>
            <button className="bg-color1 text-white p-3 m-2 rounded-md transition ease-in-out hover:bg-white hover:scale-105 border hover:border-color1 hover:text-color1 hover:shadow-md">
              5
            </button>
            <button className="bg-color1 text-white p-3 m-2 rounded-md transition ease-in-out hover:bg-white hover:scale-105 border hover:border-color1 hover:text-color1 hover:shadow-md">
              6
            </button>
            <button className="bg-color1 text-white p-3 m-2 rounded-md transition ease-in-out hover:bg-white hover:scale-105 border hover:border-color1 hover:text-color1 hover:shadow-md">
              7
            </button>

            <button className="bg-color1 text-white p-3 m-2 rounded-md transition ease-in-out hover:bg-white hover:scale-105 border hover:border-color1 hover:text-color1 hover:shadow-md">
              &#62;
            </button>
          </div>
        </div>
      </div>

      <Modal show={showModal} onClose={closeModal} />

      {productoSeleccionado && (
        <div className="fixed top-0 left-0 z-50 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg w-5/6">
            <div className="flex">
              <div className="w-5/6">
                <h2 className="text-2xl font-bold mb-4">
                  {productoSeleccionado.titulo}
                </h2>
                <p className="mb-4">{productoSeleccionado.descripcion}</p>
                <p className="text-lg font-bold">
                  Precio: {productoSeleccionado.precio}
                </p>
              </div>

              <div>
                <img
                src={productoSeleccionado.img}
                alt={productoSeleccionado.titulo}
                className="mt-4 rounded-lg"
              />
              </div>
            </div>

            <div className="flex justify-center items-center">
              
              <label htmlFor="cantidad">Introduce la cantidad</label>
              <input type="number" name="cantidad" id="cantidad" defaultValue={1} onChange={(e) => obtenerUnidades(e)}/>
            </div>

            <div className="flex gap-2">
              <button
                className="bg-color1 text-white p-3 mt-4 rounded-md transition ease-in-out hover:bg-white hover:text-color1 hover:border-color1 hover:shadow-md"
                onClick={() => {
                  clickCarrito(productoSeleccionado);
                  cerrarDetalleProducto();
                }}
              >
                Agregar al carrito
              </button>
              <button
                className="bg-color1 text-white p-3 mt-4 rounded-md transition ease-in-out hover:bg-white hover:text-color1 hover:border-color1 hover:shadow-md"
                onClick={cerrarDetalleProducto}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-3/4">
        <BtnAtencionAlCliente />
        <BtnCarrito numeroProductos={numeroProductosCarrito} />
      </div>
    </div>
  );
};

export default Productos;
