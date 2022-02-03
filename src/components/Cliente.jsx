import { useNavigate } from "react-router-dom";

const Cliente = ({ cliente, handleDelete }) => {
    const navigate = useNavigate();

    
    const {nombre, empresa, email, telefono, notas , id} = cliente;
    return (
        <tr className='p-5  text-center border-b hover:bg-gray-100'>
            <td className="p-3">{nombre}</td>
            <td className="p-3">
                <p><span className="text-gray-800 uppercase font-bold">Email: </span>{email}</p>
                <p><span className="text-gray-800 uppercase font-bold">Tel: </span>{telefono}</p>
            </td>
            <td className="p-3">{empresa}</td>
            <td className="flex justify-center p-3 gap-2">
                <div className="bg-emerald-500 hover:cursor-pointer hover:bg-emerald-800 p-1 text-white rounded-md">
                    <ion-icon onClick={() => navigate(`/clientes/${id}`)} name="eye-outline" size="large" className="text-blue-500"></ion-icon>
                </div>
                <div className="bg-emerald-500 hover:cursor-pointer hover:bg-emerald-800 p-1 text-white rounded-md text-center">
                    <ion-icon onClick={() => navigate(`/clientes/editar/${id}`)} name="create-outline" size="large" ></ion-icon>
                </div>
                <div className="bg-emerald-500 hover:cursor-pointer hover:bg-emerald-800 p-1 text-white rounded-md text-center">
                    <ion-icon onClick={() => handleDelete(id)} name="trash-outline" size="large"></ion-icon>
                </div>
                
            </td>
        </tr>
    )
};

export default Cliente;
