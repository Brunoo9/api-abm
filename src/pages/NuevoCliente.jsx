import Formulario from "../components/Formulario";

const NuevoCliente = () => {
  return (
    <>
      <h1 className="font-black text-4xl text-emerald-700">Nuevo Cliente</h1>
      <p>Llena los siguientes campos para agregar un cliente</p>
      <Formulario />
    </>
  );
};

export default NuevoCliente;
