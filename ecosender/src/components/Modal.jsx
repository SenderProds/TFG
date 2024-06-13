import { useNavigate } from "react-router-dom";




const Modal = ({ show, onClose }) => {
  const navigate = useNavigate();

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
        <div className="px-4 py-5 sm:p-6 text-center flex flex-col">
          <h1>
            Para poder continuar necesita iniciar sesion.
          </h1>
          <button className="mt-2" onClick={() => {navigate("/inicioSesion")}}>Iniciar Sesion</button>

          <button
            onClick={onClose}
            className="mt-4 inline-flex justify-center rounded-md border border-transparent px-4 py-2 bg-color1 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
