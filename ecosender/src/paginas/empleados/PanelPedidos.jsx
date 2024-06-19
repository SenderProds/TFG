import { useEffect, useState } from "react";
import {
  MdOutlineMailOutline,
  IoKeyOutline,
  MdDriveFileRenameOutline,
  HiOutlineIdentification,
  MdOutlineLocalPhone,
  CiBoxes,
  PiInvoiceBold,
  FaFileDownload,
} from "../../components/Iconos";

const PanelPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const url =
    "https://ecosender.es/api2/public/api/v1/pedidos";

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPedidos(data);
      });
  }, []);

  return (
    <div className="flex justify-center">
      <div className="bg-white rounded-xl p-4 shadow-md mt-6 w-full sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12">
        <h1 className="font-bold flex items-center justify-center mb-4 text-xl sm:text-2xl">
          <CiBoxes className="mr-2" />
          Lista de Pedidos
        </h1>

        <div className="overflow-x-auto">
          <table className="dark:divide-gray-700 divide-y divide-gray-200 w-full">
            <thead className="bg-gray-100">
              <tr className="text-center">
                <th className="p-2 sm:p-4">
                  <input type="checkbox" name="" id="" />
                </th>
                <th className="p-2 sm:p-4">
                  <div className="flex justify-center items-center">
                    <IoKeyOutline className="mr-1" />
                    Id
                  </div>
                </th>
                <th className="p-2 sm:p-4">
                  <div className="flex justify-center items-center">
                    <MdOutlineMailOutline className="mr-1" />
                    IdCliente
                  </div>
                </th>
                <th className="p-2 sm:p-4">
                  <div className="flex justify-center items-center">
                    <MdDriveFileRenameOutline className="mr-1" />
                    Fecha
                  </div>
                </th>
                <th className="p-2 sm:p-4">
                  <div className="flex justify-center items-center">
                    <HiOutlineIdentification className="mr-1" />
                    Hora
                  </div>
                </th>
                <th className="p-2 sm:p-4">
                  <div className="flex justify-center items-center">
                    <MdOutlineLocalPhone className="mr-1" />
                    Total
                  </div>
                </th>
                <th className="p-2 sm:p-4">
                  <div className="flex justify-center items-center">
                    <PiInvoiceBold className="mr-1" />
                    Descargar
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((ped) => (
                <tr
                  key={ped.id}
                  className="text-center hover:bg-gray-200 cursor-pointer"
                >
                  <td className="p-2 sm:p-4">
                    <input type="checkbox" name="" id="" />
                  </td>
                  <td className="p-2 sm:p-4">{ped.id}</td>
                  <td className="p-2 sm:p-4">{ped.id_cliente}</td>
                  <td className="p-2 sm:p-4">{ped.fecha}</td>
                  <td className="p-2 sm:p-4">{ped.hora}</td>
                  <td className="p-2 sm:p-4">{ped.total}</td>
                  <td className="p-2 sm:p-4">
                    <a
                      href={"https://ecosender.es/api/fact/" + ped.id + ".pdf"}
                      download={ped.id + ".pdf"}
                      className="text-blue-500 flex justify-center items-center"
                    >
                      <FaFileDownload className="mr-1" />
                      PDF
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PanelPedidos;
