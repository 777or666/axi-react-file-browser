import React from 'react'
import PropTypes from 'prop-types'
import { t } from 'i18next'

const MultipleConfirmDeletion = (props) => {
  const {
    handleDeleteSubmit,
  } = props

  return (
    <button className="deleting" onClick={handleDeleteSubmit}>
		{t('confirm.delete')}
    </button>
  )
}

MultipleConfirmDeletion.propTypes = {
  handleDeleteSubmit: PropTypes.func,
}

export default MultipleConfirmDeletion
