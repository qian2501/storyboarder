import React from 'react'

const Modal = ({ visible, onClose, children }) => {
  if (!visible) return null

  return React.createElement('div', {
    className: 'react_modal',
    onClick: e => { if (e.target === e.currentTarget) onClose() }
  },
    React.createElement('div', { className: 'react_modal__container' },
      children
    )
  )
}

export default Modal
