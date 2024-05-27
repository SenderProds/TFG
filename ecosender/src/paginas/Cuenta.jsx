const Cuenta = () => {
  const estaLogeado = () => {
    if (localStorage.getItem("sesion") == "true") {
      return <>Cuenta</>;
    }
    return <>No esta logeado</>;
  };

  return <>{estaLogeado()}</>;
};

export default Cuenta;
