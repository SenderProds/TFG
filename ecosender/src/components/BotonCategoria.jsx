import PropTypes from 'prop-types';

function BotonCategoria({nombre, idCategoria}){
  return (
    <>
      <button
        key={idCategoria}
        className="categoria shadow-inner w-4/4 p-2 mb-3 bg-gray-100 rounded-r-3xl hover:bg-color1 hover:text-white hover:scale-105 transition ease-in-out"
        
      >
        {nombre}
      </button>
    </>
  );
}

BotonCategoria.PropTypes = {
  nombre: PropTypes.string
}

export default BotonCategoria;
