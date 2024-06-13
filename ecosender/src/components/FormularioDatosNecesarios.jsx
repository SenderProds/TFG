
import { Callout, Divider, TextInput } from "@tremor/react";

const FormularioDatosNecesarios = (prop) => {
    
    return (<div className="p-4 mt-5 bg-white rounded-lg shadow-md flex flex-col items-center">
        <Callout className="h-24" title="Datos Necesarios" color="emerald">
          Para poder continuar es necesario que introduzcas
          los siguientes datos.
        </Callout>

        <div className="sm:mx-auto sm:max-w-2xl">
          <form onSubmit={prop.submit} method="post" className="mt-8">
            <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
              <div className="col-span-full sm:col-span-3">
                <label
                  htmlFor="nombre"
                  className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                >
                  Nombre
                  <span className="text-red-500">*</span>
                </label>
                <TextInput
                  type="text"
                  id="nombre"
                  name="nombre"
                  autoComplete="Nombre"
                  placeholder="Nombre"
                  className="mt-2"
                  required
                  value="Nombre"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label
                  htmlFor="apellidos"
                  className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                >
                  Apellidos
                  <span className="text-red-500">*</span>
                </label>
                <TextInput
                  type="text"
                  id="apellidos"
                  name="apellidos"
                  autoComplete="Apellidos"
                  placeholder="Apellidos"
                  className="mt-2"
                  value="Apellidos"
                  required
                />
              </div>

              <div className="col-span-full sm:col-span-3">
                <label
                  htmlFor="dni"
                  className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                >
                  DNI
                  <span className="text-red-500">*</span>
                </label>
                <TextInput
                  type="text"
                  id="dni"
                  name="dni"
                  autoComplete="DNI"
                  placeholder="DNI"
                  className="mt-2"
                  required
                  value="66369970C"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label
                  htmlFor="telefono"
                  className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                >
                  Telefono (+34)
                  <span className="text-red-500">*</span>
                </label>
                <TextInput
                  type="text"
                  id="telefono"
                  name="telefono"
                  autoComplete="Telefono"
                  placeholder="Telefono"
                  className="mt-2"
                  value="711781616"
                  required
                />
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="direccion"
                  className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                >
                  Direccion
                  <span className="text-red-500">*</span>
                </label>
                <TextInput
                  type="text"
                  id="direccion"
                  name="direccion"
                  autoComplete="street-address"
                  placeholder="Direccion"
                  className="mt-2"
                  value="Direccion de Ejemplo"
                  required
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label
                  htmlFor="ciudad"
                  className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                >
                  Ciudad
                  <span className="text-red-500">*</span>
                </label>
                <TextInput
                  type="text"
                  id="ciudad"
                  name="ciudad"
                  autoComplete="address-level2"
                  placeholder="Ciudad"
                  className="mt-2"
                  required
                  value="Granada"
                />
              </div>

              <div className="col-span-full sm:col-span-3">
                <label
                  htmlFor="codigoPostal"
                  className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                >
                  Codigo Postal
                  <span className="text-red-500">*</span>
                </label>
                <TextInput
                  id="codigoPostal"
                  name="codigoPostal"
                  autoComplete="Codigo Postal"
                  placeholder="Codigo Postal"
                  className="mt-2"
                  required
                  value="18220"
                />
              </div>
            </div>
            <Divider />

            <div className="flex items-center justify-end space-x-4">
              <button
                type="submit"
                className="whitespace-nowrap rounded-tremor-default bg-tremor-brand px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis"
              >
                Continuar
              </button>
            </div>
          </form>
        </div>
      </div>);
}

export default FormularioDatosNecesarios