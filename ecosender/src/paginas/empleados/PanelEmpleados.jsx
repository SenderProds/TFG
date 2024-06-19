import { useEffect, useState } from "react";
import { MdOutlineMailOutline, IoKeyOutline, MdDriveFileRenameOutline, HiOutlineIdentification, MdOutlineLocalPhone, CiUser, MdModeEdit, LuUsers, IoMdClose } from "../../components/Iconos";
import axios from "axios";

const PanelEmpleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [mostrarAgregarEmpleado, setMostrarAgregarEmpleado] = useState(false);
  const url = "https://ecosender.es/api2/public/api/v1/empleados";

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setEmpleados(data);
      });
  }, []);

  const agregarEmpleado = (e) => {
    const url = "https://ecosender.es/api2/public/api/v1/agregarEmpleado";

    e.preventDefault();

    let correo = document.getElementById('correo').value;
    let nombre = document.getElementById('nombre').value;
    let clave = document.getElementById('clave').value;
    let nif = document.getElementById('nif').value;
    let telefono = document.getElementById('telefono').value;
    let rol = document.getElementById('rol').value;

    axios.post(url, {
      correo: correo,
      nombreEmpleado: nombre,
      clave: clave,
      nif: nif,
      telefono: telefono,
      rol: rol
    }).then((response) => {
        
    })
    .catch((error) => {

    });

    console.log(correo, nombre, clave, nif, telefono, rol);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-xl p-4 shadow-md mt-4 w-full max-w-6xl flex justify-center">
          <button className="bg-color1 p-2 text-white rounded-xl" onClick={() => { setMostrarAgregarEmpleado(true) }}>
            Agregar Empleado
          </button>
        </div>

        {mostrarAgregarEmpleado ? (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-4 rounded-xl md:w-3/6">
              <div className="flex items-center justify-between">
                <h2 className="font-bold">Agregar Empleado</h2>
                <IoMdClose className="text-3xl cursor-pointer hover:bg-color1 hover:p-1 hover:text-white hover:rounded-full" onClick={() => { setMostrarAgregarEmpleado(false) }} />
              </div>

              <form onSubmit={agregarEmpleado} className="flex flex-col mt-2">
                <label htmlFor="correo">Correo</label>
                <input type="email" name="correo" id="correo" className="rounded-xl mb-2" required />

                <label htmlFor="nombre">Nombre</label>
                <input type="text" name="nombre" id="nombre" className="rounded-xl mb-2" required />

                <label htmlFor="clave">Clave</label>
                <input type="password" name="clave" id="clave" className="rounded-xl mb-2" required />

                <label htmlFor="nif">NIF</label>
                <input type="text" name="nif" id="nif" className="rounded-xl mb-2" required />

                <label htmlFor="telefono">Telefono</label>
                <input type="text" name="telefono" id="telefono" className="rounded-xl mb-2" required />

                <label htmlFor="rol">Rol</label>
                <select name="rol" id="rol" className="rounded-xl mb-4" required>
                  <option value="1">Administrador</option>
                  <option value="2">Usuario</option>
                  <option value="3">Invitado</option>
                </select>

                <input type="submit" value="Agregar Usuario" className="bg-color1 rounded-xl p-4 mt-2 text-white" />
              </form>
            </div>
          </div>
        ) : null}

        <div className="bg-white rounded-xl p-4 shadow-md mt-4 w-full max-w-6xl flex flex-col items-center">
          <h1 className="font-bold flex items-center justify-start w-full mb-4">
            <LuUsers className="mr-2" />
            Lista de empleados
          </h1>

          <div className="overflow-x-auto w-full">
            <table className="hidden md:table min-w-full dark:divide-gray-700 divide-y divide-gray-200">
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
                {empleados.map((empl) => (
                  <tr key={empl.id} className="text-center hover:bg-slate-300 cursor-pointer">
                    <td className="p-2 sm:p-4 text-xs sm:text-sm md:text-base">{empl.id}</td>
                    <td className="p-2 sm:p-4 text-xs sm:text-sm md:text-base">{empl.correo}</td>
                    <td className="p-2 sm:p-4 text-xs sm:text-sm md:text-base">{empl.nombreEmpleado}</td>
                    <td className="p-2 sm:p-4 text-xs sm:text-sm md:text-base">{empl.nif}</td>
                    <td className="p-2 sm:p-4 text-xs sm:text-sm md:text-base">{empl.telefono}</td>

                    
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="md:hidden">
              {empleados.map((empl) => (
                <div key={empl.id} className="bg-gray-50 p-4 mb-4 rounded-lg shadow-md">
                  <div className="flex items-center mb-2">
                    <IoKeyOutline className="mr-2" />
                    <span className="font-bold">Id:</span>
                    <span className="ml-2">{empl.id}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <MdOutlineMailOutline className="mr-2" />
                    <span className="font-bold">Correo:</span>
                    <span className="ml-2">{empl.correo}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <MdDriveFileRenameOutline className="mr-2" />
                    <span className="font-bold">Nombre Usuario:</span>
                    <span className="ml-2">{empl.nombreEmpleado}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <HiOutlineIdentification className="mr-2" />
                    <span className="font-bold">NIF:</span>
                    <span className="ml-2">{empl.nif}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <MdOutlineLocalPhone className="mr-2" />
                    <span className="font-bold">Telefono:</span>
                    <span className="ml-2">{empl.telefono}</span>
                  </div>
                  
                  
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PanelEmpleados;
