import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdSolarPower, FaSolarPanel } from "../../components/Iconos";
import {
    GiBattery0,
    GiBattery25,
    GiBattery50,
    GiBattery75,
    GiBattery100,
} from "react-icons/gi";
import { Badge } from '@tremor/react'; // No hay importación de BadgeDelta


const calcularPorcentajeBateria = (voltaje) => {
    const minVoltaje = 7.7;
    const maxVoltaje = 14.4;
    const porcentaje = ((voltaje - minVoltaje) / (maxVoltaje - minVoltaje)) * 100;
    return Math.min(Math.max(porcentaje, 0), 100); // Asegurarse de que el porcentaje esté entre 0 y 100
};

const obtenerIconoBateria = (porcentaje) => {
    if (porcentaje <= 0) {
        return <GiBattery0 className="text-4xl mr-2" />;
    } else if (porcentaje <= 25) {
        return <GiBattery25 className="text-4xl mr-2" />;
    } else if (porcentaje <= 50) {
        return <GiBattery50 className="text-4xl mr-2" />;
    } else if (porcentaje <= 75) {
        return <GiBattery75 className="text-4xl mr-2" />;
    } else {
        return <GiBattery100 className="text-4xl mr-2" />;
    }
};

const InstalacionesUsuario = () => {
    const [instalacion, setInstalacion] = useState(null);
    const [ultimaActualizacion, setUltimaActualizacion] = useState(null);

    const obtenerDatosInstalacion = async () => {
        try {
            const response = await axios.get('https://ecosender.es/api2/public/api/v1/instalaciones');
            const data = response.data;
            setInstalacion(data);
            setUltimaActualizacion(new Date().toLocaleTimeString());
        } catch (error) {
            console.error('Error al obtener los datos de la instalación:', error);
        }
    };

    useEffect(() => {
        obtenerDatosInstalacion(); // Obtener los datos al cargar el componente

        const intervalo = setInterval(() => {
            obtenerDatosInstalacion(); // Actualizar los datos cada minuto
        }, 60000);

        return () => clearInterval(intervalo); // Limpiar el intervalo al desmontar el componente
    }, []);

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="bg-white w-full md:w-3/4 lg:w-2/4 xl:w-3/6 p-4 mt-4 rounded-xl shadow-md flex flex-col items-center justify-center relative">
                <div className="absolute top-2 right-2 text-gray-500">
                    <Badge>Última actualización: {ultimaActualizacion}</Badge>
                </div>
                <div className="flex items-center mb-4 mt-6">
                    <FaSolarPanel className="text-2xl mr-2" /> Instalación
                </div>
                <div className="flex flex-col items-center">
                    <h2 className="text-lg font-bold">Panel Solar 25W</h2>
                    <MdSolarPower className="text-5xl my-4" />
                    {instalacion && (
                        <div className="flex flex-col md:flex-row items-center mt-4">
                            <div className="md:flex md:items-center md:mr-4">
                                <p className="text-lg">Voltaje: {instalacion.voltaje} V</p>
                                <div className="flex items-center mt-2">
                                    {obtenerIconoBateria(calcularPorcentajeBateria(instalacion.voltaje))}
                                    <span className="text-lg">{calcularPorcentajeBateria(instalacion.voltaje).toFixed(2)}%</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default InstalacionesUsuario;
