import { axiosConfiguration } from '../configuration/axiosConfiguration';

//obtener todas las productoras
const obtenerTipos = () => {
     return axiosConfiguration.get('tipos', {
      headers:{
        'Content-Type': 'application/json'
      }
    })
} 

//crear productora
const crearTipos = (data) => {
  return axiosConfiguration.post('tipos', data, {
    headers:{
      'Content-Type': 'application/json'
    }
  })
}

//actualizar productora
const editarTipos = (tipoId, data) => {
  return axiosConfiguration.put('tipos/'+tipoId, data, {
    headers:{
      'Content-Type': 'application/json'
    }
  })
}

//eliminar productora
const borrarTipos = (tipoId, data) => {
  return axiosConfiguration.delete('tipos/'+tipoId, data, {
    headers:{
      'Content-Type': 'application/json'
    }
  })
}

//productora por id
const obtenerTiposPorId = (tipoId) => {
  return axiosConfiguration.post('tipos'+tipoId, {
    headers:{
      'Content-Type': 'application/json'
    }
  })
}

export{
  obtenerTipos,
  crearTipos,
  editarTipos,
  borrarTipos,
  obtenerTiposPorId
}