import PropTypes from 'prop-types'
import React from 'react'
import { t } from 'i18next'

class Detail extends React.Component {
  static propTypes = {
    file: PropTypes.shape({
      key: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      extension: PropTypes.string.isRequired,
      url: PropTypes.string,
    }).isRequired,
    close: PropTypes.func,
  }

  handleCloseClick = (event) => {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }
    this.props.close()
  }

  render() {
    let name = this.props.file.key.split('/')
    name = name.length ? name[name.length - 1] : ''

    return (
      <div onClick={(event) => {event.stopPropagation()}}>
        <h3>{t('detail.header')}</h3>
        <dl>
          <dt>{t('detail.key')}</dt>
          <dd>{this.props.file.key}</dd>
          <dt>{t('detail.name')}</dt>
          <dd>{name}</dd>
        </dl>
        <a href="#" onClick={this.handleCloseClick}>{t('detail.close')}</a>
      </div>
    )
  }
}

export default Detail
