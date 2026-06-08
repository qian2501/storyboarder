import React from 'react'

const Scrollable = ({ children, style }) => {
  return React.createElement('div', {
    style: { overflowY: 'auto', ...(style || {}) }
  }, children)
}

export default Scrollable
