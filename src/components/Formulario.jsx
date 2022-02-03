
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'
import Alerta from './Alerta';
import { useNavigate } from 'react-router-dom';


const Formulario = ( { cliente }) => {
    const navigate = useNavigate();
  
    const nuevoClienteSchema = Yup.object().shape({
                nombre: Yup.string()
                            .required('El nombre del cliente es obligatorio')
                            .min(3, 'Nombre muy corto')
                            .max(40, 'Nombre Muy largo'),
                empresa: Yup.string()
                            .required('La empresa es obligatoria'),
                email: Yup.string()
                          .email('El email no es válido') 
                          .required('El email es obligatorio'),
                telefono: Yup.number()
                            .positive('Número no válido')
                            .integer('Número no válido')
                            .typeError('Número no válido')
    })
    const handleSubmit = async (values) => {
        
        try {
            let respuesta
            if (cliente.id) {
                //edita un registro
                const url = `http://localhost:4000/clientes/${cliente.id}`;
                respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(values),
                    headers:{
                        'Content-Type': 'application/json'
                    }    
                })
            }else{
                //nuevo registro
                const url = 'http://localhost:4000/clientes';
                respuesta = await fetch(url,{
                    method:'POST',
                    body: JSON.stringify(values),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                })
                
            }

            await respuesta.json() // lo pongo aca para no ponerlo dos veces
            // sino lo tendria que poner cuando edito el registro o cuando lo edito 
            
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
        <h1 className="font-bold text-gray-600 text-xl uppercase text-center">
            {cliente.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
        </h1>
         <Formik 
         // cliente va estar siempre por que es un default props, pero las propiedas como nombre
         // email etc no van a estar siempre por eso hay que validarlas para que no esten en undefined
         // cuando esas propiedades no esten, por eso se hace esa validacion diciendo 
         // si cliente?.nombre existe ponele ese valor sino un string vacio
         // seria lo mismo que ponerlo con un ternario 
         // cliente.nombre ? cliente.nombre : ''; seria lo mismo 
            initialValues={{
                nombre:cliente?.nombre ?? '',
                empresa: cliente?.empresa ?? '',
                email: cliente?.email ?? '',
                telefono: cliente?.telefono ?? '',
                notas: cliente?.notas ?? ''
            }}
            enableReinitialize ={true}
            onSubmit={async (values,{resetForm})=>{ // gracias a formik aca vienen todos los valores de los inputs al momento de submitear
                await handleSubmit(values)
                if(cliente.id){
                    navigate('/clientes')
                    resetForm();    
                }else{
                    resetForm();
                }
                
            }}
            validationSchema={nuevoClienteSchema}

        >
            {({errors, touched}) =>{
              
             return(   
                <Form className="mt-10" autoComplete='off'>
                    <div className="mb-4">
                        <label className="text-gray-800" htmlFor="nombre">Nombre</label>
                        <Field 
                            type="text"
                            id="nombre"
                            className={`${errors.nombre && touched.nombre ? 'border border-red-500': ''} outline-none mt-2 block w-full p-3 bg-gray-100`}
                            placeholder="Nombre Cliente"
                            name="nombre"
                        />
                    </div>
                    {errors.nombre && touched.nombre ? ( <Alerta>{errors.nombre}</Alerta>): null }
                    <div className="mb-4">
                        <label className="text-gray-800" htmlFor="empresa">Empresa</label>
                        <Field 
                            type="text"
                            id="empresa"
                            className={`${errors.empresa && touched.empresa  ? 'border border-red-500': ''} outline-none mt-2 block w-full p-3 bg-gray-100`}
                            placeholder="Empresa del Cliente"
                            name="empresa"
                        />
                    </div>
                    {errors.empresa && touched.empresa ? ( <Alerta>{errors.empresa}</Alerta>): null }
                    <div className="mb-4">
                        <label className="text-gray-800" htmlFor="email">E-mail</label>
                        <Field
                            type="text" 
                            id="email"
                            className={`${errors.email && touched.email ? 'border border-red-500': ''} outline-none mt-2 block w-full p-3 bg-gray-100`}
                            placeholder="Email del Cliente"
                            name="email"
                        />
                    </div>
                    {errors.email && touched.email ? ( <Alerta>{errors.email}</Alerta>): null }
                    <div className="mb-4">
                        <label className="text-gray-800" htmlFor="telefono">Teléfono</label>
                        <Field
                            type="tel" 
                            id="telefono"
                            className={`${errors.telefono && touched.telefono  ? 'border border-red-500': ''} outline-none mt-2 block w-full p-3 bg-gray-100`}
                            placeholder="Teléfono del Cliente"
                            name="telefono"
                        />
                    </div>
                    {errors.telefono && touched.telefono ? ( <Alerta>{errors.telefono}</Alerta>): null }
                    <div className="mb-4">
                        <label className="text-gray-800" htmlFor="notas">Notas</label>
                        <Field 
                            as="textarea"
                            type="text"
                            id="notas"
                            className={`${errors.notas && touched.notas ? 'border border-red-500': ''} outline-none mt-2 block w-full p-3 bg-gray-100`}
                            placeholder="Notas sobre el Cliente"
                            name="notas"
                        />
                    </div>
                    {errors.notas && touched.notas ? ( <Alerta>{errors.notas}</Alerta>): null }
                    <input 
                        type="submit"
                        value={cliente.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
                        className="mt-5 font-bold text-lg uppercase w-full bg-emerald-500 text-white p-3 hover:cursor-pointer hover:bg-emerald-700"
                    />
                </Form>
             )}}
         </Formik>
    </div>  
  )
}
Formulario.defaultProps = {
    cliente:{}
}
export default Formulario;
