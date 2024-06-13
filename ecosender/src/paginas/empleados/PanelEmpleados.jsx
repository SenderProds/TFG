import { useEffect, useState } from "react";

import { MdOutlineMailOutline } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { HiOutlineIdentification } from "react-icons/hi";
import { MdOutlineLocalPhone } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { MdModeEdit } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import { Button } from '@tremor/react';

const PanelEmpleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const url = "https://ecosender.es/api/obtenerEmpleados.php";

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setEmpleados(data);
      });
  }, []);
  return (
    <>
      <div className=" flex flex-col justify-center items-center">
        <div className="bg-white rounded-xl p-4 shadow-md mt-4 w-5/6">
          <button>Agregar Empleado</button>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-md mt-4 w-5/6 flex flex-col items-center">
          <h1 className="font-bold flex items-center justify-start w-full">
            <LuUsers />
            Lista de empleados
          </h1>

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
            <tbody>
              {empleados.map((empl) => (
                <tr
                  key={empl.id}
                  className=" text-center hover:bg-slate-300 cursor-pointer"
                >
                  <td>
                    <input type="checkbox" name="" id="" />
                  </td>

                  <td className="p-4">{empl.id}</td>
                  <td>{empl.correo}</td>
                  <td>{empl.nombreEmpleado}</td>
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
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PanelEmpleados;
