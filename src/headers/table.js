import PropTypes from 'prop-types'
import React from 'react'
import ClassNames from 'classnames'
import { DropTarget } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'
import { BaseFileConnectors } from './../base-file.js'
import { withTranslation } from 'react-i18next'
import "../translations/i18n"

class RawTableHeader extends React.Component {
  static propTypes = {
    select: PropTypes.func,
    fileKey: PropTypes.string,

    connectDropTarget: PropTypes.func,
    isOver: PropTypes.bool,
    isSelected: PropTypes.func,

    browserProps: PropTypes.shape({
      createFiles: PropTypes.func,
      moveFolder: PropTypes.func,
      moveFile: PropTypes.func,
    }),
  }

  handleHeaderClick(event) {
    this.props.select(this.props.fileKey)
  }

  render() {
	  	const {t} = this.props
    	const header = (
		<tr
				className={ClassNames('fb-folder-thead', {
				dragover: this.props.isOver,
				selected: this.props.isSelected,
				})}
			>
			<th>{t('headers.files')}</th>
			<th className="size">{t('headers.size')}</th>
			<th className="modified">{t('headers.modified')}</th>
		</tr>  		
    )

    if (
      typeof this.props.browserProps.createFiles === 'function' ||
      typeof this.props.browserProps.moveFile === 'function' ||
      typeof this.props.browserProps.moveFolder === 'function'
    ) {
      return this.props.connectDropTarget(header)
    } else {
      return header
    }
  }
}

const TableHeader = DropTarget(
  ['file', 'folder', NativeTypes.FILE], 
  BaseFileConnectors.targetSource, 
  BaseFileConnectors.targetCollect
)(RawTableHeader)

export default withTranslation()(TableHeader)
//export default TableHeader

export { RawTableHeader }
