import axios from "axios";
import { useEffect, useState } from "react";
import { CiBoxes } from "react-icons/ci";
import { FaFileDownload } from "react-icons/fa";
import { HiOutlineIdentification } from "react-icons/hi";
import { IoKeyOutline } from "react-icons/io5";
import {
  MdDriveFileRenameOutline,
  MdModeEdit,
  MdOutlineLocalPhone,
  MdOutlineMailOutline,
} from "react-icons/md";
import { PiInvoiceBold } from "react-icons/pi";

const PanelProductos = () => {
  const [productos, setProductos] = useState();

  const obtenerProductos = () => {
    const url = "https://ecosender.es/api2/public/api/v1/productos";
    axios
      .get(url)
      .then((response) => {
        setProductos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    obtenerProductos();
  }, []);


  const agregarProducto = (e) => {
    e.preventDefault();
    const formData = new FormData();

    let caracteristicas = {};
    caracteristicas.voltaje = document.getElementById("voltaje").value;
    caracteristicas.potencia = document.getElementById("potencia").value;


    formData.append("titulo", document.getElementById('titulo').value);
    formData.append("descripcion", document.getElementById('descripcion').value);
    formData.append("caracteristicas", JSON.stringify(caracteristicas));
    formData.append("precio", document.getElementById('precio').value);
    formData.append("categoria", document.getElementById('categoria').value);


    const fileInput = document.getElementById("imagen");
    const imagen = fileInput.files[0];


    formData.append("imagen", imagen);

    
  }
  return (
    <>
      <div className=" flex flex-col justify-center items-center relative">
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2>Agregar Producto</h2>

            <form onSubmit={agregarProducto} className="flex flex-col">
                <label htmlFor="titulo">Titulo</label>
                <input type="text" name="titulo" id="titulo" required/>

                <label htmlFor="descripcion">Descripcion</label>
                <input type="text" name="descripcion" id="descripcion" required />

                <label htmlFor="voltaje">Voltaje(V)</label>
                <input type="text" name="voltaje" id="voltaje" required/>

                <label htmlFor="potencia">Potencia(W)</label>
                <input type="text" name="potencia" id="potencia" required/>

                <label htmlFor="precio">Precio</label>
                <input type="text" name="precio" id="precio" required/>

                <label htmlFor="imagen">Imagen</label>
                <input type="file" name="imagen" id="imagen" required/>

                <label htmlFor="categoria">Categoria</label>
                <input type="number" name="categoria" id="categoria" />

                <input type="submit" value="Agregar" />
            </form>
          </div>
        </div>

        <div className="bg-white mt-4 w-5/6 p-4 rounded-xl shadow-md">
          <button className="bg-color1 text-white p-2 rounded-xl">
            Agregar Producto
          </button>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-md mt-6 m-4 w-5/6">
          <h1 className="font-bold flex items-center">
            <CiBoxes />
            Lista de Productos
          </h1>

          <table className="dark:divide-gray-700 divide-y divide-gray-200  w">
            <thead className=" ">
              <tr>
                <th className="p-4">
                  <input type="checkbox" name="" id="" />
                </th>

                <th className="p-4">
                  <div className="flex justify-center items-center">
                    <IoKeyOutline />
                    Id
                  </div>
                </th>

                <th className="p-4">
                  <div className="flex justify-center items-center">Titulo</div>
                </th>

                <th className="p-4">
                  <div className="flex justify-center items-center">Precio</div>
                </th>

                <th className="p-4">
                  <div className="flex justify-center items-center">Imagen</div>
                </th>
                <th className="p-4">
                  <div className="flex justify-center items-center">
                    Categoria
                  </div>
                </th>

                <th className="p-4">
                  <div className="flex justify-center items-center">
                    <MdModeEdit />
                    Editar
                  </div>
                </th>

                <th className="p-4">
                  <div className="flex justify-center items-center">
                    <MdModeEdit />
                    Eliminar
                  </div>
                </th>
              </tr>
            </thead>
            {productos ? (
              <>
                {productos.map((ped) => (
                  <tr
                    key={ped.id}
                    className=" text-center hover:bg-slate-300 cursor-pointer"
                  >
                    <td>
                      <input type="checkbox" name="" id="" />
                    </td>

                    <td className="p-4">{ped.id}</td>
                    <td>{ped.titulo}</td>
                    <td>{ped.precio}</td>
                    <td className="p-1">
                      <img src={ped.img} alt="" height={100} width={100} />
                    </td>
                    <td>{ped.categoria}</td>

                    <td>
                      <a href="" className="text-blue-500">
                        Editar
                      </a>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <></>
            )}
          </table>
        </div>
      </div>
    </>
  );
};

export default PanelProductos;
