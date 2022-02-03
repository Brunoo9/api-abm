import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const VerCliente = () => {
    const [cliente, setCliente] = useState({});

    const [cargando, setCargando] = useState(false);

    const { id } = useParams();
    useEffect(() => {
        setCargando(!cargando)
        const getOneClient = async() => {
            try {
                const url = `http://localhost:4000/clientes/${id}`;
                const respuesta = await fetch(url);
                const resultado = await respuesta.json();
                setCliente(resultado);
            } catch (error) {
                console.log(error);
            }
            setCargando(false)
        }
        getOneClient();

    },[]);
    
    return (
        Object.keys(cliente).length === 0 ? <p>No hay resultados</p> : (
            <div>
                {cargando ? (<Spinner />):(
                    <>
                        <div className="mb-10">
                            <h1 className="font-black text-5xl mb-4 text-emerald-600">Ver Cliente: {cliente.nombre}</h1>
                            <p>Información del Cliente</p>
                        </div>
                        <p className="text-2xl text-gray-700 mb-2">
                            <span className="font-bold  uppercase ">Cliente: </span> 
                            {cliente.nombre}
                        </p>
                        <p className="text-2xl text-gray-700 mb-2">
                            <span className="font-bold  uppercase ">Email: </span> 
                            {cliente.email}
                        </p>
                        {cliente.telefono && (
                            <p className="text-2xl text-gray-700 mb-2">
                                <span className="font-bold  uppercase ">Télefono: </span> 
                                {cliente.telefono}
                            </p>
                        )}
                        
                        {cliente.empresa && (
                            <p className="text-2xl text-gray-700 mb-2">
                                <span className="font-bold  uppercase ">Empresa: </span> 
                                {cliente.empresa}
                            </p>
                        )}
                        
                        {cliente.notas && (
                            <p className="text-2xl text-gray-700">
                                <span className="font-bold  uppercase ">Notas: </span> 
                                {cliente.notas}
                            </p>
                        )}
                    </>
                )}

            </div>
        )

       
    )
};

export default VerCliente;
