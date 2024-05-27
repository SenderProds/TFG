import { useEffect, useState } from "react";

const CategoriasProductos = () => {
  const [categorias, setCategorias] = useState([]);

  const urlApi = "https://ecosender.es/api/categorias/obtenerCategorias.php";

  useEffect(() => {
    fetch(urlApi)
      .then((response) => response.json())
      .then((data) => {
        setCategorias(data);
      });
  }, []);

  return (
    <>
      <div
        id="panelLateralProductos"
        className="fixed top-0 left-0 flex flex-col w-1/6 bg-white mt-36"
      >
        <h3 className="bg-color1 w-4/4 p-2 text-white rounded-r-3xl w-full text-center mb-4 font-bold font-roboto">
          Categorias
        </h3>

        {categorias.map((cat) => (
          <button
            key={cat.idCategoria}
            className="shadow-inner w-4/4 p-2 mb-3 bg-gray-100 rounded-r-3xl hover:bg-color1 hover:text-white hover:scale-105 transition ease-in-out"
          >
            {cat.NombreCategoria}
          </button>
        ))}
      </div>
    </>
  );
};

export default CategoriasProductos;
