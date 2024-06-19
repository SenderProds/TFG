import { AreaChart, BadgeDelta, Card } from "@tremor/react";
import { useEffect, useState } from "react";

const PanelIngresos = () => {
  const url = "https://ecosender.es/api/obtenerIngresosDiarios.php";
  const [ingresos, setIngresos] = useState([]);
  const [crecimiento, setCrecimiento] = useState(false);
  const [porcentaje, setPorcentaje] = useState(0);
  const [ingresosMensuales, setIngresosMensuales] = useState(0);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setIngresos(data);
      });
  }, []);

  useEffect(() => {
    if (ingresos.length >= 2) {
      let calculo =
        (ingresos[ingresos.length - 1].total * 100) /
        ingresos[ingresos.length - 2].total;

      if (calculo < 100) {
        setCrecimiento(false);
        setPorcentaje("-" + Math.round(100 - calculo));
      } else {
        setCrecimiento(true);
        setPorcentaje("+" + Math.round(calculo - 100));
      }
    }
  }, [ingresos]);

  useEffect(() => {
    // Simular ingresos mensuales sumando los ingresos diarios
    let totalMensual = 0;
    ingresos.forEach((ingreso) => {
      totalMensual += ingreso.total;
    });
    setIngresosMensuales(totalMensual);
  }, [ingresos]);

  const dataFormatter = (number) =>
    `€${Intl.NumberFormat("eu").format(number).toString()}`;

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12">
        <AreaChart
          className="h-80 bg-white p-4 mt-10 rounded-2xl shadow-md"
          data={ingresos}
          index="fecha"
          categories={["total"]}
          colors={["red"]}
          valueFormatter={dataFormatter}
          yAxisWidth={70}
        />
      </div>

      <Card className="w-full sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12 bg-white p-4 mt-10 rounded-2xl shadow-md">
        <div className="flex items-center justify-between">
          <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            Ingresos Hoy
          </h4>
          <BadgeDelta
            deltaType={crecimiento ? "moderateIncrease" : "moderateDecrease"}
            isIncreasePositive={crecimiento}
            size="sm"
          >
            {ingresos.length > 1 ? porcentaje : "Cargando..."}%
          </BadgeDelta>
        </div>

        <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
          {ingresos.length > 0
            ? dataFormatter(ingresos[ingresos.length - 1].total)
            : "Cargando..."}
        </p>
      </Card>

      <Card className="w-full sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12 bg-white p-4 mt-10 rounded-2xl shadow-md">
        <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          Ingresos Mensuales
        </h4>
        <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
          {dataFormatter(ingresosMensuales)}
        </p>
      </Card>
    </div>
  );
};

export default PanelIngresos;
