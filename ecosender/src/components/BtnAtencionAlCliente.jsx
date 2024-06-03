import { MdOutlineSupportAgent } from "react-icons/md";


const btnAtencionAlCliente = () => {
    return (
        <>
          <div className="fixed bottom-32 right-7 btnCarrito bg-white border border-2 border-color1 p-3 rounded-full text-color1 text-5xl shadow-2xl hover:scale-105 hover:rotate-3 transition ease-linear cursor-pointer">
            
            <MdOutlineSupportAgent/>
          </div>
        </>
      );
}


export default btnAtencionAlCliente;