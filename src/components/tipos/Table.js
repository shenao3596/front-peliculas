import React from 'react'

export default function Table({
  tipos = [],
  borrarTipoPorId
}) {
  const borrarPorId = (e) => {
    e.preventDefault()
    borrarTipoPorId(e)
  }

  return (
    <table className="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">ID</th>
        <th scope="col">Nombre</th>
        <th scope="col">Fecha creacion</th>
        <th scope="col">Fecha modificacion</th>
        <th scope="col">Descripcion</th>
        <th scope="col">Opciones</th>
      </tr>
    </thead>
    <tbody>
      {
        tipos.map(({nombre, fechaCreacion, fechaModificacion, descripcion, _id}, index) => {
          return (
            <tr key={index}>
              <th scope="row">{ index + 1 }</th>
              <td>{_id}</td>
              <td>{nombre}</td>
              <td>{fechaCreacion}</td>
              <td>{fechaModificacion}</td>
              <td>{descripcion}</td>
              <td> 
              <button type="button" class="btn btn-info">Editar</button>
              <button 
              id={_id}
              type="button" 
              class="btn btn-danger"
              onClick={borrarPorId}>
                Eliminar
              </button>
              </td>
            </tr>
          )
        })
      }
    </tbody>
  </table>
  )
}
