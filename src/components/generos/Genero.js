import React, { useEffect, useState } from 'react'
import { borrarGenero, crearGenero, obtenerGeneros } from '../../services/GeneroService'
import Title from '../ui/Title.js'
import Modal from './Modal'
import Table from './Table'
import ButtonModal from '../ui/ButtonModal'
import Spinner from '../ui/Spinner'
import Swal from 'sweetalert2'


export default function Genero() {

const [ generos, setGeneros, ] = useState([])
const [loader, setLoader] = useState( false )
const [genero, setGenero] = useState({
  nombre: '',
  descripcion: ''
})

useEffect(() => {
  listarGeneros()
}, [])


 const listarGeneros = async() => {
  setLoader(true)
 try {
      const { data } = await obtenerGeneros()
      setGeneros(data)
      setLoader(false)
  }catch (e){
      console.log(e)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se puede mostrar la informacion!',
        footer: e.message
      })
      setLoader(false)
  }
}

const guardar = async() => {
  setLoader(true)
 try {
      const response = await crearGenero(genero)
      console.log(response)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Se guardo la informacion correctamente',
        showConfirmButton: false,
        timer: 2000
      })
      listarGeneros()
      clearForm()
      setLoader(false)
  }catch (e){
      console.log(e)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se puedo eliminar la informacion!',
        footer: e.message
      })
      setLoader(false)
  }
}

const handleChange = e => {
    setGenero({
      ...genero,
      [e.target.name] : e.target.value
    })
}

const clearForm = () => {
  setGenero({
    nombre: '',
    descripcion: ''
  })
}

const borrarGeneroPorId = (e) => {
  const id = e.target.id
  setLoader(true)
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: '¿Estas seguro de borrar?',
    text: "No se podra revertir la accion!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si, estoy seguro!',
    cancelButtonText: 'No, cancelar!',
    reverseButtons: true
  }).then(async (result) => {
    if (result.isConfirmed) {
        try {
             const response = await borrarGenero(id)
             console.log(response)
             listarGeneros()
             setLoader(false)
         }catch (e){
             console.log(e)
             Swal.fire({
               icon: 'error',
               title: 'Error',
               text: 'No se puedo guardar la infomracion!',
               footer: e.message
             })
         }
      swalWithBootstrapButtons.fire(
        'Eliminado!',
        'Su archivo ha sido eliminado',
        'success'
      )
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelado',
        'Tu archivo esta a salvo :)',
        'error'
      )
    }
  })
  setLoader(false)
}

return (
  <>
    <Title title={'generos'}/>
    {
        loader && <Spinner />
      }
    <Table 
      generos={generos}
      borrarGeneroPorId={borrarGeneroPorId}
    />
    <ButtonModal title='Nuevo genero'/>
    <Modal 
      genero={genero}
      change={handleChange}
      guardar={guardar}
      clearForm={clearForm}
    />
  </>
)
}