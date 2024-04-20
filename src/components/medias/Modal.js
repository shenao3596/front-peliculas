import React from 'react'

export default function Modal({
  media,
  change,
  guardar,
  clearForm
}) {
  const handleChange = e => {
    change(e)
  }

  const guardarMedia = (e) => {
    e.preventDefault()
      guardar()
  }

  const clear = () => {
    clearForm()
  }

  return (
    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Nueva media</h1>
        <button 
          type="button" 
          className="btn-close" 
          data-bs-dismiss="modal" 
          aria-label="Close"
          onClick={clear}>
        </button>
      </div>
      <div className="modal-body">
        <form onSubmit={guardarMedia}>
          <div className="mb-3">
            <label for="recipient-name" className="col-form-label">Serial:</label>
            <input 
              type="text" 
              className="form-control" 
              id="recipient-name" 
              name='serial'
              onChange={handleChange}
              value={media.serial}/>
          </div>
          <div className="mb-3">
            <label for="message-text" className="col-form-label">Titulo:</label>
            <textarea 
              className="form-control" 
              id="message-text"
              name='titulo'
              onChange={handleChange}
              value={media.titulo}>
            </textarea>
          </div>
          <div className="mb-3">
            <label for="message-text" className="col-form-label">Sinopsis:</label>
            <textarea 
              className="form-control" 
              id="message-text"
              name='sinopsis'
              onChange={handleChange}
              value={media.sinopsis}>
            </textarea>
          </div>
          <div className="mb-3">
            <label for="message-text" className="col-form-label">URL:</label>
            <textarea 
              className="form-control" 
              id="message-text"
              name='url'
              onChange={handleChange}
              value={media.url}>
            </textarea>
          </div>
          <div className="mb-3">
            <label for="message-text" className="col-form-label">Imagen:</label>
            <textarea 
              className="form-control" 
              id="message-text"
              name='imagen'
              onChange={handleChange}
              value={media.imagen}>
            </textarea>
          </div>
          <div className="mb-3">
            <label for="message-text" className="col-form-label">Año estreño:</label>
            <textarea 
              className="form-control" 
              id="message-text"
              name='añoEstreno'
              onChange={handleChange}
              value={media.añoEsteno}>
            </textarea>
          </div>
          <div className="mb-3">
            <label for="message-text" className="col-form-label">Ingrese el ID del genero:</label>
            <textarea 
              className="form-control"
              id="message-text"
              name='genero'
              onChange={handleChange}
              value={media.genero.id}>
            </textarea>
          </div>
          <div className="mb-3">
            <label for="message-text" className="col-form-label">Ingrese el ID del director:</label>
            <textarea 
              className="form-control" 
              id="message-text"
              name='director'
              onChange={handleChange}
              value={media.director.id}>
            </textarea>
          </div>
          <div className="mb-3">
            <label for="message-text" className="col-form-label">Ingrese el ID de la productora:</label>
            <textarea 
              className="form-control" 
              id="message-text"
              name='productora'
              onChange={handleChange}
              value={media.productora.id}>
            </textarea>
          </div>
          <div className="mb-3">
            <label for="message-text" className="col-form-label">Ingrese el ID del tipo:</label>
            <textarea 
              className="form-control" 
              id="message-text"
              name='tipo'
              onChange={handleChange}
              value={media.tipo.id}>
            </textarea>
          </div>
          <div className="modal-footer">
        <button 
        type="button" 
          className="btn btn-secondary"
          data-bs-dismiss="modal"
          onClick={clear}>
          Cerrar
        </button>
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={media.serial.length === 0}>
          Enviar
        </button>
      </div>
        </form>
      </div>
    </div>
  </div>
</div> 
  )
}