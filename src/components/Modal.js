// import React, { Component } from 'react'

// class Modal extends Component {
    
// }

const Modal = ({ handleClose, show, handleDeleteList }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <div className="modal-main">
          <div className="modal-header bottom">
              <h3>Delete this list?</h3>
              <button type="button" className="modal-button" onClick={handleClose}>
                x
              </button>
          </div>
          <div className="modal-header">
              <button type="button" className="modal-button" onClick={handleDeleteList}>
                  Delete
              </button>
              <button type="button" className="modal-button" onClick={handleClose}>
                  Cancel
              </button>
          </div>
      </div>
    </div>
  );
};

export default Modal;