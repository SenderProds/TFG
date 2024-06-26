import { Link } from "react-router-dom";
import { PiShoppingCartLight } from "../components/Iconos";

const BtnCarrito = ({ numeroProductos }) => {
  return (
    <>
      <Link
        to="/carrito"
        className="fixed z-20 bottom-7 right-7 btnCarrito border-2 bg-white border border-color1 p-3 rounded-full text-color1 text-4xl shadow-2xl hover:scale-105 hover:rotate-3 transition ease-linear cursor-pointer"
      >
        <div className="text-xl fixed right-12 bg-red-500 text-center rounded-full h-7 w-7 mr-5 mt-8">
          {numeroProductos}
        </div>
        <PiShoppingCartLight />
      </Link>
    </>
  );
};

export default BtnCarrito;
