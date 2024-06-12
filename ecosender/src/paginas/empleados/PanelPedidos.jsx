import { useEffect, useState } from "react";

import { MdOutlineMailOutline } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { HiOutlineIdentification } from "react-icons/hi";
import { MdOutlineLocalPhone } from "react-icons/md";
import { CiBoxes } from "react-icons/ci";
import { MdModeEdit } from "react-icons/md";
import { PiInvoiceBold } from "react-icons/pi";
import { FaFileDownload } from "react-icons/fa";


const PanelPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const url = "https://ecosender.es/api/obtenerPedidos.php";

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPedidos(data);
      });
  }, []);
  return (
    <>
      <div className=" flex justify-center ">
        <div className="bg-white rounded-xl p-4 shadow-md mt-6 ">
          <h1 className="font-bold flex items-center">
            <CiBoxes />
            Lista de Pedidos
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
                    IdCliente
                  </div>
                </th>

                <th className="p-4">
                  <div className="flex justify-center items-center">
                    <MdDriveFileRenameOutline />
                    Fecha
                  </div>
                </th>

                <th className="p-4">
                  <div className="flex justify-center items-center">
                    <HiOutlineIdentification />
                    Hora
                  </div>
                </th>
                <th className="p-4">
                  <div className="flex justify-center items-center">
                    <MdOutlineLocalPhone />
                    Total
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
                    <PiInvoiceBold />
                    Descargar
                  </div>
                </th>
              </tr>
            </thead>
            {pedidos.map((ped) => (
              <tr
                key={ped.id}
                className=" text-center hover:bg-slate-300 cursor-pointer"
              >
                <td>
                  <input type="checkbox" name="" id="" />
                </td>

                <td className="p-4">{ped.id}</td>
                <td>{ped.id_cliente}</td>
                <td>{ped.fecha}</td>
                <td>{ped.hora}</td>
                <td>{ped.total}</td>

                <td>
                  <a href="" className="text-blue-500">
                    Editar
                  </a>
                </td>

                <td>
                  <a
                    href={"https://ecosender.es/api/fact/" + ped.id + ".pdf"}
                    download={ped.id + ".pdf"}
                    className="text-blue-500 flex justify-center items-center"
                  >
                    <FaFileDownload />
                    PDF
                  </a>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </>
  );
};

export default PanelPedidos;
