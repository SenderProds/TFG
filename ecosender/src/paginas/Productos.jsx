import { useState, useEffect } from "react";
import { comprobarJWT } from "../utilidades/sesion";
import { agregarAlCarrito } from "../utilidades/carrito";
import Producto from "../components/Producto";
import Modal from "../components/Modal";
import BtnCategorias from "../components/BtnCategorias";
import BtnCarrito from "../components/BtnCarrito";
import BtnAtencionAlCliente from "../components/BtnAtencionAlCliente";



const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [categoria, setCategoria] = useState(1);
  const [numeroProductosCarrito, setNumeroProductosCarrito] = useState(0);

  const urlApi =
    "https://ecosender.es/api/productos/obtenerProductosCategoria.php?categoria=" +
    categoria;

  const urlApiCategorias =
    "https://ecosender.es/api/categorias/obtenerCategorias.php";

  useEffect(() => {
    fetch(urlApiCategorias)
      .then((response) => response.json())
      .then((data) => {
        setCategorias(data);
      });
  }, []);

  /**
   *
   */
  useEffect(() => {
    fetch(urlApi)
      .then((response) => response.json())
      .then((data) => {
        setProductos(data);
      });
  }, [categoria]);

  /**
   * Al hacer click en agregar al carrito de un producto
   * @param {*} producto
   */
  const clickCarrito = (producto) => {
    console.log(producto);
    const loggingStatus = localStorage.getItem("sesion");
    if (loggingStatus) {
      const checkJWT = async () => {
        try {
          let respuesta = await comprobarJWT(loggingStatus);
          console.log(respuesta);

          //Si el JWT no es valido saldra que hace falta logearse para agregar productos al carrito
          if (respuesta == "false") {
            setShowModal(true);
          }else{
            agregarAlCarrito(producto);
            setNumeroProductosCarrito(numeroProductosCarrito + 1);
          }
        } catch (error) {
          console.error("Error comprobando el JWT:", error);
        }
      };

      checkJWT();
    } else {
      setShowModal(true);
    }
  };

  /**
   * Cerrar el Modal
   */
  const closeModal = () => {
    setShowModal(false);
  };

  /**
   * Cuanto se hace click en alguna categoria
   * @param {*} id
   */
  const clickCategoria = (id) => {
    setCategoria(id);
    console.log(id);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-around">
        <div
          id="panelLateralProductos"
          className="fixed top-0 left-0 flex flex-col w-1/6 bg-white mt-36"
        >
          <h3 className="bg-color1 w-4/4 p-2 text-white rounded-r-3xl w-full text-center mb-4 font-bold font-roboto">
            Categorias
          </h3>

          {categorias.map((cat) => (
            <BtnCategorias
              key={cat.idCategoria}
              nombre={cat.NombreCategoria}
              onClick={() => clickCategoria(cat.idCategoria)}
            />
          ))}
        </div>

        <div className="w-1/6"></div>

        <div className="w-5/6 flex flex-col justify-center items-center">
          <div
            id="contenedorProductos"
            className="flex flex-wrap justify-center gap-8 mt-6 min-h-screen z-0"
            data-categoria="1"
          >
            {productos.map((prod) => (
              <Producto
                key={prod.id}
                titulo={prod.titulo}
                precio={prod.precio}
                img={prod.img}
                onClick={() => clickCarrito(prod.id)}
              />
            ))}
          </div>

          <div className="mt-6 flex shadow-md rounded-lg w-2/6 justify-center">
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
      <BtnAtencionAlCliente/>
      <BtnCarrito numeroProductos={numeroProductosCarrito}/>
    </div>
  );
};

export default Productos;
