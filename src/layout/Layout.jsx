import { Outlet, Link, useLocation} from "react-router-dom";
import NuevoCliente from "../pages/NuevoCliente";

/*
  Layout va a ser la master page, la pagina principal
  Poniendo el outlet, significa que ahi se va a renderizar los componentes segun la ruta 
  especificada en el app.jsx por ejemplo si estamos en /clientes solamente va cargar el
  componente Inicio pq es la ruta principal o root y si por ej estamos en /cliente/nuevo
  va a cargar el Componente NuevoCliente.jsx

*/
const Layout = () => {
  
  const location = useLocation();
  const urlActual = location.pathname;

  return (
    
    <div className="md:flex md:min-h-screen">
      <div className="md:w-1/4 bg-emerald-500 px-5 py-10 ">
        <h2 className="text-4xl text-center font-black text-white">ABM-Clientes</h2>
        <nav className="mt-10 text-white">
          <Link className={`${urlActual === '/clientes' ? "text-emerald-700  border-b-4 border-emerald-600" : ""} text-2xl block text-center mt-2 py-3 hover:bg-emerald-600 hover:text-white`} to="/clientes">
            Clientes
          </Link>
          <Link className={`${urlActual === '/clientes/nuevo' ? "text-emerald-700 border-b-4 border-emerald-600" : ""} text-2xl block text-center mt-2 py-3 hover:bg-emerald-600 hover:text-white`}  to="/clientes/nuevo">
            Nuevo Cliente
          </Link>
        </nav>
      </div>
     
      <div className="md:w-3/4 p-10 md:h-screen overflow-scroll"> {/* md:h-screen para que ocupe todo el alto de la pantalla y el overflow scroll para que pueda bajar y subir de ese lado de la pantalla nada mas*/}
        <Outlet/>
      </div>
    </div>
    
    )
};

export default Layout;
