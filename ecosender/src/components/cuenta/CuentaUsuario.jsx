import { IoSettingsOutline } from "react-icons/io5";
import { FaRegSave } from "react-icons/fa";
import { Button } from "@tremor/react";
import { MdOutlinePassword } from "react-icons/md";

const CuentaUsuario = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="bg-white p-4 m-4 rounded-xl shadow-md w-4/4 md:w-2/4">
          <h1 className="font-bold text-xl flex items-center gap-2">
            <IoSettingsOutline />
            Ajustes De Cuenta{" "}
          </h1>
          <p>Actualiza tu informacion personal.</p>

          <form action="" className="mt-4">
            <div className=" 2xl:flex justify-around">
              <div>
                <div className="flex justify-between items-center mt-4 gap-2">
                  <label htmlFor="nombre">Nombre</label>
                  <input type="text" className="rounded-xl" />
                </div>

                <div className="flex justify-between items-center mt-4 gap-2">
                  <label htmlFor="dni">DNI</label>
                  <input type="text" className="rounded-xl" />
                </div>

                <div className="flex justify-between items-center mt-4 gap-2">
                  <label htmlFor="direcion">Direccion</label>
                  <input type="text" className="rounded-xl" />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mt-4 gap-2">
                  <label htmlFor="apellidos">Apellidos</label>
                  <input type="text" className="rounded-xl" />
                </div>

                <div className="flex justify-between items-center mt-4 gap-2">
                  <label htmlFor="telefono">Telefono</label>
                  <input type="text" className="rounded-xl" />
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              color="zinc"
              icon={FaRegSave}
              className="mt-4 bg-color1 "
            >
              Guardar Datos
            </Button>
          </form>
        </div>

        <div className="w-2/4 bg-white m-4 p-4 rounded-xl shadow-md">
          <h1 className="font-bold text-xl flex gap-2 items-center">
            <MdOutlinePassword />
            Cambiar Clave
          </h1>
          <p>Cambia tu clave de acceso.</p>
            <form action="" className="mt-4">
                <label htmlFor="clave">Introduce la nueva clave: </label>
                <input type="password" name="clave" id="clave" className="rounded-xl"/>

            </form>
          <div></div>
        </div>
      </div>

      <div className="flex">
        <div></div>

        <div className="w-2/4 bg-white m-4 p-4 rounded-xl shadow-md">
          <h1 className="font-bold text-xl">N Pedidos</h1>
          <p>Numero toral de pedidos realizados.</p>
        </div>
      </div>
    </>
  );
};

export default CuentaUsuario;
