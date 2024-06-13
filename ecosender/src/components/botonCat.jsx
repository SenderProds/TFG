const botonCat = (props) => {
    return (<>
        <button
        key={props.idCategoria}
        className="categoria shadow-inner w-4/4 p-2 mb-3 bg-gray-100 rounded-r-3xl hover:bg-color1 hover:text-white hover:scale-105 transition ease-in-out"
        >
            {props.nombre}
        </button>
    </>)
}



export default botonCat;