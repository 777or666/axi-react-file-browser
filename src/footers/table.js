import PropTypes from 'prop-types'
import React from 'react'
import ClassNames from 'classnames'
import { DropTarget } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'
import { BaseFileConnectors } from './../base-file.js'
import "../translations/i18n"
import { t } from 'i18next'

class RawTableFooter extends React.Component {
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
		event.preventDefault()
		event.stopPropagation()
		this.props.select(this.props.fileKey)
	}

	render() {
		const footer = (
			<tr
				className={ClassNames('fb-folder-tfoot', {
					dragover: this.props.isOver,
					selected: this.props.isSelected,
				})}
			>
				<td colspan={100}>{t('footer.message')}</td>
			</tr>
		)

		if (
			typeof this.props.browserProps.createFiles === 'function' 
		) {
			return this.props.connectDropTarget(footer)
		} else {
			//return footer
			return null
		}
	}
}

const TableFooter = DropTarget(
	['file', 'folder', NativeTypes.FILE],
	BaseFileConnectors.targetSource,
	BaseFileConnectors.targetCollect
)(RawTableFooter)

export default TableFooter

export { RawTableFooter }
