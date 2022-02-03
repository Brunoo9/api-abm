import { useState, useEffect } from "react";
import Cliente from "../components/Cliente";

    const Inicio = () => {
      const [ clientes, setClientes] = useState([]);
      const getClients = async () => {
        const url = 'http://localhost:4000/clientes';
        const respuesta = await fetch(url)
        const resultado = await respuesta.json();
        setClientes(resultado);
      }
      useEffect(() => {
        
        getClients();
      }, []);

      const handleDelete = async (id) => {
        const confirmar = confirm('¿Estás Seguro que deseas eliminar este registro?');
        if (confirmar) {
          try {
            const url = `http://localhost:4000/clientes/${id}`

            const respuesta = await fetch(url, {
                method:'DELETE',
            })

            await respuesta.json();
            await getClients()
           

          } catch (error) {
            console.log(error);
          }
         
        }

        

      }
      
      return (
        <div>
          <h1 className="font-black text-4xl text-emerald-700">Clientes</h1>
          <p>Administra tus Clientes</p>
          <table className="w-full mt-5 table-auto shadow bg-white">
            <thead>
              <tr className="bg-emerald-500 text-white">
                <th className="p-2">Nombre</th>
                <th className="p-2">Contacto</th>
                <th className="p-2">Empresa</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <Cliente
                  key={cliente.id}
                  cliente={cliente}
                  handleDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      );
    };
    
    export default Inicio;
    