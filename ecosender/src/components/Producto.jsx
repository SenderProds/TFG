function Producto(props) {

  /**
   * Si el titulo tiene mas de 45 caracteres se pone ...
   * @param {*} titulo 
   * @returns 
   */
  function truncarTitulo(titulo) {
    let tituloTr = titulo;
    if (titulo.length > 45) {
      tituloTr = titulo.slice(0, 45) + "...";
    }

    return tituloTr;
  }

  return (
    <>
      <div className="producto p-4 shadow-xl  flex flex-col items-center justify-center h-80 w-72 border-color1 border rounded cursor-pointer hover:scale-105 transition ease-in-out ">
        <img
          src={props.img}
          alt=""
          height={100}

          className="h-4/6"
        />
        <a href="#" className="h-1/6">
          {truncarTitulo(props.titulo)}
        </a>

        <p className="h-1/6">{props.precio}€</p>
        <button
          className="h-1/6 p-2 m-2 w-3/4 font-roboto bg-color1 text-white hover:scale-105 hover:bg-white hover:text-color1 hover:shadow-lg transition ease-in-out rounded-md"
          onClick={props.onClick}
        >
          AGREGAR AL CARRITO
        </button>
      </div>
    </>
  );
}

export default Producto;
