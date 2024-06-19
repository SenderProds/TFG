import { useEffect, useState } from "react";
import { MdOutlineMailOutline, IoKeyOutline, MdDriveFileRenameOutline, HiOutlineIdentification, MdOutlineLocalPhone, MdModeEdit, LuUsers } from "../../components/Iconos";

const PanelClientes = () => {
  const [clientes, setClientes] = useState([]);
  const url = "https://ecosender.es/api2/public/api/v1/usuarios";

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setClientes(data);
      });
  }, []);

  return (
    <div className="flex justify-center p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-xl p-4 shadow-md w-full max-w-6xl">
        <h1 className="font-bold flex items-center text-lg mb-4">
          <LuUsers className="mr-2" />
          Lista de Clientes
        </h1>

        <div className="overflow-x-auto">
          <table className="hidden md:table divide-y divide-gray-200 w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-2 sm:p-4 text-xs sm:text-sm md:text-base">
                  <div className="flex justify-center items-center">
                    <IoKeyOutline className="mr-1" />
                    Id
                  </div>
                </th>
                <th className="p-2 sm:p-4 text-xs sm:text-sm md:text-base">
                  <div className="flex justify-center items-center">
                    <MdOutlineMailOutline className="mr-1" />
                    Correo
                  </div>
                </th>
                <th className="p-2 sm:p-4 text-xs sm:text-sm md:text-base">
                  <div className="flex justify-center items-center">
                    <MdDriveFileRenameOutline className="mr-1" />
                    Nombre Usuario
                  </div>
                </th>
                <th className="p-2 sm:p-4 text-xs sm:text-sm md:text-base">
                  <div className="flex justify-center items-center">
                    <HiOutlineIdentification className="mr-1" />
                    NIF
                  </div>
                </th>
                <th className="p-2 sm:p-4 text-xs sm:text-sm md:text-base">
                  <div className="flex justify-center items-center">
                    <MdOutlineLocalPhone className="mr-1" />
                    Telefono
                  </div>
                </th>
                
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr
                  key={cliente.id}
                  className="text-center hover:bg-slate-300 cursor-pointer"
                >
                  <td className="p-2 sm:p-4 text-xs sm:text-sm md:text-base">{cliente.idUsuario}</td>
                  <td className="p-2 sm:p-4 flex items-center gap-2 text-xs sm:text-sm md:text-base">
                    {cliente.imagen ? (
                      <>
                        <img src={cliente.imagen} alt="" height={40} width={40} className="rounded-full" />
                        {cliente.correo}
                      </>
                    ) : (
                      <>
                        <img src="https://th.bing.com/th/id/R.1c75547f74d8aa7720a495f208c9b1c8?rik=cm6kaKgbGRM6Cg&pid=ImgRaw&r=0" alt="" height={40} width={40} className="rounded-full" />
                        {cliente.correo}
                      </>
                    )}
                  </td>
                  <td className="p-2 sm:p-4 text-xs sm:text-sm md:text-base">{cliente.nombreUsuario}</td>
                  <td className="p-2 sm:p-4 text-xs sm:text-sm md:text-base">{cliente.DNI}</td>
                  <td className="p-2 sm:p-4 text-xs sm:text-sm md:text-base">{cliente.Telefono}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>

          <div className="md:hidden">
            {clientes.map((cliente) => (
              <div key={cliente.id} className="bg-gray-50 p-4 mb-4 rounded-lg shadow-md">
                <div className="flex items-center mb-2">
                  <IoKeyOutline className="mr-2" />
                  <span className="font-bold">Id:</span>
                  <span className="ml-2">{cliente.idUsuario}</span>
                </div>
                <div className="flex items-center mb-2">
                  <MdOutlineMailOutline className="mr-2" />
                  <span className="font-bold">Correo:</span>
                  <span className="ml-2">{cliente.imagen ? <img src={cliente.imagen} alt="" height={40} width={40} className="rounded-full inline-block mr-2" /> : <img src="https://th.bing.com/th/id/R.1c75547f74d8aa7720a495f208c9b1c8?rik=cm6kaKgbGRM6Cg&pid=ImgRaw&r=0" alt="" height={40} width={40} className="rounded-full inline-block mr-2" />}{cliente.correo}</span>
                </div>
                <div className="flex items-center mb-2">
                  <MdDriveFileRenameOutline className="mr-2" />
                  <span className="font-bold">Nombre Usuario:</span>
                  <span className="ml-2">{cliente.nombreUsuario}</span>
                </div>
                <div className="flex items-center mb-2">
                  <HiOutlineIdentification className="mr-2" />
                  <span className="font-bold">NIF:</span>
                  <span className="ml-2">{cliente.DNI}</span>
                </div>
                <div className="flex items-center mb-2">
                  <MdOutlineLocalPhone className="mr-2" />
                  <span className="font-bold">Telefono:</span>
                  <span className="ml-2">{cliente.Telefono}</span>
                </div>
                
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelClientes;