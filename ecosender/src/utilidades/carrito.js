export function agregarAlCarrito(id){
    let carrito = localStorage.getItem("carrito");
    if(carrito){
        let carritoModificado = JSON.parse(carrito);
        if(carritoModificado[id]){
            carritoModificado[id] += 1;
        }else{
            carritoModificado[id] = 1;
        }


        localStorage.setItem("carrito", JSON.stringify(carritoModificado));
        console.log("Esta el carrito en la sesion");
    }else{
        console.log("Se va agregar un producto al carrito --> ", id);
        let nuevoCarrito = {};
        nuevoCarrito[id] = 1;

        let carritoAlmacenamiento = JSON.stringify(nuevoCarrito);
        
        localStorage.setItem("carrito", carritoAlmacenamiento);
    }
}