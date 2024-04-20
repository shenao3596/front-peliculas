import { axiosConfiguration } from '../configuration/axiosConfiguration';

//obtener todas las productoras
const obtenerMedias = () => {
    return axiosConfiguration.get('medias', {
      headers:{
        'Content-Type': 'application/json'
      }
    })
} 

//crear productora
const crearMedia = (data) => {
  return axiosConfiguration.post('medias', data, {
    headers:{
      'Content-Type': 'application/json'
    }
  })
}

//actualizar productora
const editarMedia = (tipoId, data) => {
  return axiosConfiguration.put('medias/'+tipoId, data, {
    headers:{
      'Content-Type': 'application/json'
    }
  })
}

//eliminar productora
const borrarMedia = (tipoId, data) => {
  return axiosConfiguration.delete('medias/'+tipoId, data, {
    headers:{
      'Content-Type': 'application/json'
    }
  })
}

//productora por id
const obtenerMediaPorId = (tipoId) => {
  return axiosConfiguration.post('medias'+tipoId, {
    headers:{
      'Content-Type': 'application/json'
    }
  })
}

export{
  obtenerMedias,
  crearMedia,
  editarMedia,
  borrarMedia,
  obtenerMediaPorId
}