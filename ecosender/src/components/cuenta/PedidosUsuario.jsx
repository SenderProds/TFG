import { useEffect, useState } from "react";

import {
  CiBoxes,
  IoKeyOutline,
  MdDriveFileRenameOutline,
  MdOutlineLocalPhone,
  MdOutlineMailOutline,
  HiOutlineIdentification,
} from "../../components/Iconos";

import { PiInvoiceBold } from "react-icons/pi";
import { FaFileDownload } from "react-icons/fa";
import axios from "axios";

const PedidosUsuario = (prop) => {
  const [pedidos, setPedidos] = useState([]);
  const url = "https://ecosender.es/api/obtenerPedidosUsuario.php";

  const obtenerPedidos = () => {
    const data = {
      id: prop.id,
    };

    axios
      .post(url, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        setPedidos(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    obtenerPedidos();
  }, []);
  return (
    <>
      <div className=" flex justify-center ">
        <div className="bg-white rounded-xl p-4 shadow-md mt-6 mb-4">
          <h1 className="font-bold flex items-center">
            <CiBoxes />
            Lista de Pedidos
          </h1>

          <table className="dark:divide-gray-700 divide-y divide-gray-200 ">
            <thead className=" ">
              <tr>
                <th className="text-xs sm:text-base p-1 sm:p-4 ">
                  <div className="flex justify-center items-center">
                    <IoKeyOutline className="hidden sm:block" />
                    Id
                  </div>
                </th>

                <th className="text-xs p-1 sm:p-4 sm:text-base">
                  <div className="flex justify-center items-center ">
                    <MdOutlineMailOutline className="hidden sm:block" />
                    IdCliente
                  </div>
                </th>

                <th className="text-xs sm:text-base p-1 sm:p-4 hidden md:block ">
                  <div className="flex justify-center items-center">
                    <MdDriveFileRenameOutline className="hidden sm:block" />
                    Fecha
                  </div>
                </th>

                <th className=" text-xs sm:text-base p-1 sm:p-4">
                  <div className="flex justify-center items-center">
                    <HiOutlineIdentification className="hidden sm:block" />
                    Hora
                  </div>
                </th>
                <th className="text-xs sm:text-base p-1 sm:p-4">
                  <div className="flex justify-center items-center">
                    <MdOutlineLocalPhone className="hidden sm:block" />
                    Total
                  </div>
                </th>

                <th className="text-xs sm:text-base p-4">
                  <div className="flex justify-center items-center">
                    <PiInvoiceBold className="hidden sm:block" />
                    Descargar
                  </div>
                </th>
              </tr>
            </thead>
            {pedidos ? (<>
              {pedidos.map((ped) => (
              <tr
                key={ped.id}
                className=" text-center hover:bg-slate-300 cursor-pointer"
              >
                <td className="p-4 text-xs sm:text-base ">{ped.id}</td>
                <td className="text-xs sm:text-base">{ped.id_cliente}</td>
                <td className="hidden md:block text-xs sm:text-base">{ped.fecha}</td>
                <td className="text-xs sm:text-base">{ped.hora}</td>
                <td className="text-xs sm:text-base">{ped.total}€</td>

                <td className="text-xs sm:text-base">
                  <a
                    href={"https://ecosender.es/api/fact/" + ped.id + ".pdf"}
                    download={ped.id + ".pdf"}
                    className="text-blue-500 flex justify-center items-center text-xl sm:text-lg"
                  >
                    <FaFileDownload />
                    <p className="hidden sm:block">PDF</p>
                  </a>
                </td>
              </tr>
            ))}
            </>) : <></>}
            
          </table>
        </div>
      </div>
    </>
  );
};

export default PedidosUsuario;
