function BtnCategorias(props) {
  return (
    <>
      <button
        className="categoria shadow-inner w-3/4 md:w-full p-2 mb-3 bg-gray-200 md:rounded-r-3xl hover:bg-color1 hover:text-white hover:scale-105 transition ease-in-out"
        onClick={props.onClick}
      >
        {props.nombre}
      </button>
    </>
  );
}

export default BtnCategorias;
