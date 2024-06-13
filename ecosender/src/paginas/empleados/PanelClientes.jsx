import { useEffect, useState } from "react";

import { MdOutlineMailOutline } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { HiOutlineIdentification } from "react-icons/hi";
import { MdOutlineLocalPhone } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { MdModeEdit } from "react-icons/md";
import { LuUsers } from "react-icons/lu";




const PanelClientes = () => {
    const [clientes, setClientes] = useState([]);
  const url = "https://ecosender.es/api/obtenerClientes.php";

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setClientes(data);
      });
  }, []);
  return (
    <>
      <div className=" flex justify-center">
        
        <div className="bg-white rounded-xl p-4 shadow-md mt-6">
        <h1 className="font-bold flex items-center"><LuUsers />Lista de Clientes</h1>


          <table className="dark:divide-gray-700 divide-y divide-gray-200  ">
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
                  <div className="flex justify-center items-center">
                    <MdOutlineMailOutline />
                    Correo
                  </div>
                </th>

                

                <th className="p-4">
                  <div className="flex justify-center items-center">
                    <MdDriveFileRenameOutline />
                    Nombre Usuario
                  </div>
                </th>

                <th className="p-4">
                  <div className="flex justify-center items-center">
                    <HiOutlineIdentification />
                    NIF
                  </div>
                </th>
                <th className="p-4">
                  <div className="flex justify-center items-center">
                    <MdOutlineLocalPhone />
                    Telefono
                  </div>
                </th>
                <th className="p-4">
                  <div className="flex justify-center items-center">
                    <CiUser />
                    rol
                  </div>
                </th>

                <th className="p-4">
                  <div className="flex justify-center items-center">
                    <MdModeEdit />
                    Editar
                  </div>
                </th>
              </tr>
            </thead>
            {clientes.map((empl) => (
              <tr
                key={empl.id}
                className=" text-center hover:bg-slate-300 cursor-pointer"
              >
                <td>
                  <input type="checkbox" name="" id="" />
                </td>

                <td className="p-4">{empl.idUsuario}</td>
                

                <td className="flex items-center gap-2">{empl.imagen ? (<><img src={empl.imagen} alt="" height={50} width={50} className="rounded-full"/>{empl.correo}
                </>) : <><img src="https://th.bing.com/th/id/R.1c75547f74d8aa7720a495f208c9b1c8?rik=cm6kaKgbGRM6Cg&pid=ImgRaw&r=0" alt="" height={50} width={50} />{empl.correo}</>}</td>
                <td>{empl.nombreUsuario}</td>
                <td>{empl.nif}</td>
                <td>{empl.telefono}</td>
                <td>{empl.rol}</td>
                <td>
                  <a href="" className="text-blue-500">
                    Editar
                  </a>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </>
  );
}


export default PanelClientes;