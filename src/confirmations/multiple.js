import React from 'react'
import PropTypes from 'prop-types'

const MultipleConfirmDeletion = (props) => {
  const {
    handleDeleteSubmit,
  } = props

  return (
    <button className="deleting" onClick={handleDeleteSubmit}>
      Подтвердить удаление 
    </button>
  )
}

MultipleConfirmDeletion.propTypes = {
  handleDeleteSubmit: PropTypes.func,
}

export default MultipleConfirmDeletion
