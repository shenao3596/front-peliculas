import React, { useEffect, useState } from 'react'
import { borrarProductora, crearProductora, obtenerProductoras } from '../../services/ProductoraServices.js'
import Title from '../ui/Title.js'
import Modal from './Modal.js'
import Table from './Table.js'
import ButtonModal from '../ui/ButtonModal.js'
import Spinner from '../ui/Spinner'
import Swal from 'sweetalert2'

export default function Productora() {
    const [ productoras, setProductoras ] = useState([])
    const [loader, setLoader] = useState( false )
    const [productora, setProductora] = useState({
  nombre: ''
})
  useEffect(() => {
    listarProductoras()
  }, [])


   const listarProductoras = async() => {
    setLoader(true)
    try {
      const { data } = await obtenerProductoras()
      setProductoras(data)
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
      const response = await crearProductora(productora)
      console.log(response)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Se guardo la informacion correctamente',
        showConfirmButton: false,
        timer: 2000
      })
      listarProductoras()
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
    setProductora({
      ...productora,
      [e.target.name] : e.target.value
    })
}

const clearForm = () => {
  setProductora({
    nombre: '',
    slogan: '',
    descripcion: ''
  })
}

const borrarProductoraPorId = (e) => {
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
             const response = await borrarProductora(id)
             console.log(response)
             listarProductoras()
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
      <Title title={'Productoras'}/>
      {
        loader && <Spinner />
      }
      <Table 
      productoras={productoras}
      borrarProductoraPorId={borrarProductoraPorId}
      />
      <ButtonModal title='Nueva productora'/>
      <Modal 
        productora={productora}
        change={handleChange}
        guardar={guardar}
        clearForm={clearForm}
      />
    </>
  )
}

