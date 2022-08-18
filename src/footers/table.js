import PropTypes from 'prop-types'
import React from 'react'
import ClassNames from 'classnames'
import { DropTarget } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'
import { BaseFileConnectors } from './../base-file.js'
import "../translations/i18n"
import { t } from 'i18next'

class RawTableFooter extends React.Component {
  constructor(props) {
    super(props)
    this.filePicker = React.createRef()

    this.state = {
      selectedFile: null,
      upload: [],
      drag: false,
    }
  }

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

	handlePick = () => {
	  this.filePicker.current.click()
	}

	handleChangeInput(event, functionCreateFiles) {
	  event.preventDefault()
	  const files = [...event.target.files]
	  functionCreateFiles(files, '')
	}

	render() {
	  const footer = (
			<tr
				className={ClassNames('fb-folder-tfoot', {
				  selected: this.props.isSelected,
				})}
			>
				<td 
				colspan={100}
				onClick={this.handlePick}
				>
					{t('footer.message')}
				</td>
				<input type="file" multiple
	  ref={this.filePicker}
	  onChange={(e) => this.handleChangeInput(e, this.props.browserProps.createFiles)}
	  style={{
	    width: '0',
	    height: '0',
	    lineHeight: '0',
	    overflow: 'hidden',
	    padding: '0',
	    margin: '0',
	  }}
	/>
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
