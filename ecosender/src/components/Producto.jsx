import { useState } from "react";

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

  const [animacionCarrito, setAnimacionCarrito] = useState(false);

  const animacion = () => {
    setAnimacionCarrito(true);
    setTimeout(() => {
      setAnimacionCarrito(false)
    }, 1000);
  }
  

  const mostraDetalles = (e, pro, agregar) => {

    if(e.target.tagName !== "BUTTON"){
      pro();
    }else{
      agregar();
    }
    
  }

  return (
    <>
      <div className="bg-white producto p-4 shadow-xl flex flex-col items-center justify-center h-80 w-72 border-color1 border rounded cursor-pointer hover:scale-105 transition ease-in-out relative" onClick={(e) => mostraDetalles(e, props.detalle, props.agregarCarrito)}>
        <img src={props.img} alt="" height={100} className="h-4/6" alt={props.titulo} />
        <a href="#" className="h-1/6">
          {truncarTitulo(props.titulo)}
        </a>
        <p className="h-1/6">{props.precio}€</p>
        <button
          className="h-1/6 p-2 m-2 w-3/4 font-roboto bg-color1 text-white hover:scale-105 hover:bg-white hover:text-color1 hover:shadow-lg transition ease-in-out rounded-md z-10"
          onClick={props.agregarCarrito}
        >
          AGREGAR AL CARRITO
        </button>
      </div>
    </>
  );
}

export default Producto;
