import React, { useEffect, useState } from 'react'
import { borrarMedia, crearMedia, obtenerMedias } from '../../services/MediaService'
import Title from '../ui/Title.js'
import Modal from './Modal.js'
import Table from './Table'
import ButtonModal from '../ui/ButtonModal'
import Spinner from '../ui/Spinner'
import Swal from 'sweetalert2'

export default function Productora() {

    const [ medias, setMedias, ] = useState([])
    const [loader, setLoader] = useState( false )
    const [media, setMedia] = useState({
  serial: '',
  titulo: '',
  sinopsis: '',
  url: '',
  imagen: '',
  añoEstreno: '',
  genero: '',
  director: '',
  productora: '',
  tipo: ''
})
  useEffect(() => {
    listarMedias()
  }, [])


   const listarMedias = async() => {
    setLoader(true)
   try {
        const { data } = await obtenerMedias()
        setMedias(data)
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
      const response = await crearMedia(media)
      console.log(response)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Se guardo la informacion correctamente',
        showConfirmButton: false,
        timer: 2000
      })
      listarMedias()
      clearForm()
      setLoader(false)
  }catch (e){
      console.log(e)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se puedo guardar la informacion!',
        footer: e.message
      })
      setLoader(false)
  }
}

const handleChange = e => {
    setMedia({
      ...media,
      [e.target.name] : e.target.value
    })
}

const clearForm = () => {
  setMedia({
    serial: '',
    titulo: '',
    sinopsis: '',
    url: '',
    imagen: '',
    añoEstreno: '',
    genero: '',
    director: '',
    productora: '',
    tipo: ''
  })
}

const borrarMediaPorId = (e) => {
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
             const response = await borrarMedia(id)
             console.log(response)
             listarMedias()
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
      <Title title={'Medias'}/>
      {
        loader && <Spinner />
      }
      <Table 
      medias={medias}
      borrarMediaPorId={borrarMediaPorId}
      />
      <ButtonModal title='Nueva media'/>
      <Modal 
        media={media}
        change={handleChange}
        guardar={guardar}
        clearForm={clearForm}
      />
    </>
  )
}