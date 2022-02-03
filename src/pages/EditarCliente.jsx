import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Formulario from '../components/Formulario';
import Spinner from '../components/Spinner';

const EditarCliente = () => {
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
    
    <>
      <h1 className="font-black text-4xl text-emerald-700">Editar Cliente</h1>
      <p>Utiliza este formulario para editar datos de un cliente</p>
      {cargando ? (<Spinner />) :(
        cliente.nombre ? (<Formulario 
          cliente={cliente}
        />):(<p>Cliente ID no válido</p>) )} 
      
    </>
  )
};

export default EditarCliente;
