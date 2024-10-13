import React, { useEffect } from 'react'

const OutsideClickHandler = ({ onOutsideClick, children }) => {
  useEffect(() => {
    const handleClickOutside = (e) => {
      const content = e.target.textContent
      const text = []
      const insde = false
      for (const child of children.props.children) {
        if (child.props.children) {
          text.push(child.props.children)
        }
      }

      if (e.target && text.length && content != 'Rolly Widget') {
        onOutsideClick()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onOutsideClick, children])

  return <>{children}</>
}

export default OutsideClickHandler
