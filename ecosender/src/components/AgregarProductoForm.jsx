//PAGINA SOLO DESARROLLO

import $ from "jquery";

const AgregarProductoForm = () => {
  const agregarProducto = (e) => {
    e.preventDefault();
    console.log("Enviando Formulario");

    const url = "https://ecosender.es/api/prueba.php";

    const formData = new FormData();

    formData.append("titulo", $("#tituloProducto").val());
    formData.append("precio", $("#precio").val());
    formData.append("stock", $("#stock").val());
    formData.append("idCategoria", $("#idCategoria").val());
    formData.append("potencia", $("#potencia").val());
    formData.append("voltaje", $("#voltaje").val());

    const fileInput = document.getElementById("imagen");
    const imagen = fileInput.files[0];

    console.log(imagen);
    formData.append("imagen", imagen);

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      contentType: false,
      processData: false,
      success: function (response) {
        console.log(response);
      },
      error: function (error) {
        console.error("Error al enviar el formulario:", error);
      },
    });
  };

  return (
    <>
      <form
        onSubmit={agregarProducto}
        action=""
        id="addForm"
        className="flex flex-col items-center align-middle content-center"
      >
        <label htmlFor="tituloProducto">Titulo del producto</label>
        <input
          type="text"
          name="tituloProducto"
          id="tituloProducto"
          className="border-4 w-2/4"
        />

        <label htmlFor="precio">Precio del producto</label>
        <input
          type="text"
          name="precio"
          id="precio"
          className="border-4 w-2/4"
        />

        <label htmlFor="stock">Stock</label>
        <input type="text" name="stock" id="stock" className="border-4 w-2/4" />

        <label htmlFor="imagen">Imagen</label>
        <input
          type="file"
          name="imagen"
          id="imagen"
          className="border-4 w-2/4"
        />

        <label htmlFor="">Potencia del panel solar (w)</label>
        <input type="number" name="potencia" id="potencia" />

        <label htmlFor="">Voltaje de trabajo (v)</label>
        <input type="number" name="voltaje" id="voltaje" />

        <label htmlFor="idCategoria">Id Categoria</label>
        <input
          type="text"
          name="idCategoria"
          id="idCategoria"
          className="border-4 w-2/4"
        />

        <input
          type="submit"
          value="Agregar"
          className="bg-slate-500 w-2/4 p-2 m-2 cursor-pointer hover:bg-black hover:text-white transition ease-in-out "
        />
      </form>
    </>
  );
};

export default AgregarProductoForm;
