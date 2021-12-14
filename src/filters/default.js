import PropTypes from 'prop-types'
import React from 'react'
import { t } from 'i18next'
class Filter extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    updateFilter: PropTypes.func,
  }

  handleFilterChange = (event) => {
    const newValue = event.target.value
    this.props.updateFilter(newValue)
  }

  render() {
    //const {t} = this.props
    return (
      <input
        type="search"
        placeholder={t('filter.filter')}
        value={this.props.value}
        onChange={this.handleFilterChange}
      />
    )
  }
}

//export default withTranslation()(Filter)
export default Filter
