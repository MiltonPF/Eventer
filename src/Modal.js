import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
        <div className="modal fade" id="mi_modal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
              <div className="login-container">
                <button type="button" className="close btn-c btn btn-danger mr-2" data-dismiss="modal">
                  X
                </button>
                <form className='form-container'>
                  <h4 className='tittle-sesion mt-4'>Iniciar Sesion</h4>
                  <div className='input-container'>
                    <input
                      className="input-login"
                      type="email"
                      id="email"
                      required
                    />
                    <label htmlFor="email" className="email-label">
                      Correo electrónico
                    </label>
                  </div>
                  <div className='input-container'>
                    <input
                      className="input-login"
                      type="password"
                      required
                    />
                    <label htmlFor="email" className="email-label">
                      Contraseña
                    </label>
                  </div> 
                  <button className="btn-login" type="submit">Iniciar sesión</button>
                </form>
              </div>
                           
            </div>
        </div>
      </div>
    );
  };
  
  export default Modal;