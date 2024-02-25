import { useState, useEffect } from 'react';
import Error from './error';

const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {
  
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [sintomas, setSintomas] = useState('');
  const [modeEdit, setmodeEdit] = useState(false);

  const [error, setError] = useState(false);

  useEffect(() => {
    if( Object.keys(paciente).length > 0){
      setmodeEdit(true)
      
      const {nombre, propietario, email, fecha, sintomas} = paciente;
  
      setNombre(nombre);
      setPropietario(propietario);
      setEmail(email);
      setFecha(fecha);
      setSintomas(sintomas);
    }
  }, [paciente])

  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);

    return random + fecha;
  }

  const handlerSubmit = (e) => {
    e.preventDefault();

    const ObjetoPaciente = {
      nombre, 
      propietario, 
      email, 
      fecha, 
      sintomas
    }

      if(modeEdit){
        // Editando
        ObjetoPaciente.id = paciente.id;

        const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? ObjetoPaciente : pacienteState)

        setPacientes(pacientesActualizados)
        setPaciente({})

      } else {
        // Nuevo registro

        if([nombre, propietario, email, fecha, sintomas].includes('')){
          console.log("Hay campos vacios")
          setError(true);
        } else {
          setError(false)
          ObjetoPaciente.id = generarId();
          //Toma la copia de array de pacientes y le añade el nuevo objeto de pacientes
          setPacientes([...pacientes, ObjetoPaciente]);
          console.log("Todos los campos estan llenos")
        }
      }

      setNombre('');
      setPropietario('');
      setEmail('');
      setFecha('');
      setSintomas('');
      setmodeEdit(false)

  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10"> Añade Pacientes y {''} 
        <span className="text-indigo-600 font-bold">Adminsitralos</span>
      </p> 


      <form onSubmit={handlerSubmit} className="bg-white shadow-md rounded-lg py-10 px-5 mb-1" >
      {error && <Error>Todos los campos son obligatorios</Error>}
        <div className="mb-5">
          <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">
            Nombre Mascota
            </label>
          <input 
          id="mascota" 
          type="text" 
          placeholder="Nombre de la mascota" 
          className="border-2 w-full p-2 mt-2 placerholder-gray-400 rounded-md focus:bg-gray-100"
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)}/>
        </div>

        <div className="mb-5">
          <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">
            Nombre Propietario
            </label>
          <input 
          id="propietario" 
          type="text" 
          placeholder="Nombre del propietario" 
          className="border-2 w-full p-2 mt-2 placerholder-gray-400 rounded-md focus:bg-gray-100"
          value={propietario} 
          onChange={(e) => setPropietario(e.target.value)} />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
            Email
            </label>
          <input 
          id="email" 
          type="email" 
          placeholder="Email Contacto propietario" 
          className="border-2 w-full p-2 mt-2 placerholder-gray-400 rounded-md focus:bg-gray-100"
          value={email} 
          onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="mb-5">
          <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">
            Alta
            </label>
          <input 
          id="alta" 
          type="date"
          className="border-2 w-full p-2 mt-2 placerholder-gray-400 rounded-md focus:bg-gray-100"
          value={fecha} 
          onChange={(e) => setFecha(e.target.value)} />
        </div>

        <div className="mb-5">
          <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">
            Síntomas
            </label>
            <textarea 
            id="sintomas" 
            className="border-2 resize-none w-full p-2 mt-2 placerholder-gray-400 rounded-md focus:bg-gray-100"
            value={sintomas} 
            onChange={(e) => setSintomas(e.target.value)} />
        </div>

        <input 
        type="submit"
        className="bg-indigo-600 w-full p-3 mb-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
        value={modeEdit ? "Guardar cambios" : "agregar paciente"}/>

      </form>
    </div>
  )
}

export default Formulario
