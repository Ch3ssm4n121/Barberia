import React from 'react'
import './ControlClient.css';
import { useState } from 'react';
function ControlClient() {
    const [Nombre,setNombre] = useState('');
    const [numerotel,setNumtel] = useState(0);
    const [edad,setedad] = useState(0);
    const [correo,setcorreo] = useState('');
    const [password,setpassword] = useState('');

    const mostrarDatos =()=>{
        alert(Nombre,numerotel,edad,correo,password);
    }
  return (
    <div className='control'>
      <div className="datos">
      <label>Nombre Completo: <input onChange={(event)=>{setNombre(event.target.value)}} type='text' /></label><br/>
      <label>Numero Telefonico: <input onChange={(event)=>{setNumtel(event.target.value)}}type='number'/></label><br/>
      <label>Edad: <input onChange={(event)=>{setedad(event.target.value)}} type='text'/></label><br/>
      <label>Correo Electronico: <input onChange={(event)=>{setcorreo(event.target.value)}} type='text'/></label><br/>
      <label>Contraseña: <input onChange={(event)=>{setpassword(event.target.value)}} type='text'/></label><br/>
      <button onClick={mostrarDatos}>Registrar</button>
      </div>
    </div>
  )

}

export default ControlClient
