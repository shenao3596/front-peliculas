import React, { useEffect, useState } from 'react'
import { borrarDirector, crearDirector, obtenerDirectores } from '../../services/DirectorService'
import Title from '../ui/Title.js'
import Modal from './Modal'
import Table from './Table'
import ButtonModal from '../ui/ButtonModal'
import Spinner from '../ui/Spinner'
import Swal from 'sweetalert2'

export default function Productora() {

    const [ directores, setDirectores ] = useState([])
    const [loader, setLoader] = useState( false )
    const [director, setDirector] = useState({
  nombre: ''
})
  useEffect(() => {
    listarDirectores()
  }, [])


   const listarDirectores = async() => {
    setLoader(true)
    try {
        const { data } = await obtenerDirectores()
        setDirectores(data)
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
      const response = await crearDirector(director)
      console.log(response)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Se guardo la informacion correctamente',
        showConfirmButton: false,
        timer: 2000
      })
      listarDirectores()
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
    setDirector({
      ...director,
      [e.target.name] : e.target.value
    })
}

const clearForm = () => {
  setDirector({
    nombre: '',
  })
}

const borrarDirectorPorId = (e) => {
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
    title: '¿Estas seguro de borar?',
    text: "No se podra revertir la accion!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si, estoy seguro!',
    cancelButtonText: 'No, cancelar!',
    reverseButtons: true
  }).then(async (result) => {
    if (result.isConfirmed) {
        try {
             const response = await borrarDirector(id)
             console.log(response)
             listarDirectores()
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
   
      <Title title={'Directores'}/>
      {
        loader && <Spinner />
      }
      <Table 
      directores={directores}
      borrarDirectorPorId={borrarDirectorPorId}
      />
      <ButtonModal title='Nuevo director'/>
      <Modal 
        director={director}
        change={handleChange}
        guardar={guardar}
        clearForm={clearForm}
      />
    </>
  )
}