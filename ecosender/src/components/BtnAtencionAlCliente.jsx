import { MdOutlineSupportAgent } from "../components/Iconos";
import { Link } from "react-router-dom";

const btnAtencionAlCliente = () => {
  return (
    <>
      <Link
        to="/chat"
        className="fixed z-20 bottom-28 right-7 btnCarrito border-2 bg-white border border-color1 p-3 rounded-full text-color1 text-4xl shadow-2xl hover:scale-105 hover:rotate-3 transition ease-linear cursor-pointer"
      >
      <div className="">
        <MdOutlineSupportAgent />
      </div></Link>
    </>
  );
};

export default btnAtencionAlCliente;
