import React from 'react'
import ClassNames from 'classnames'
import { DragSource, DropTarget } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'
import { formatDistanceToNow, formatRelative} from 'date-fns'
import { es, ru } from 'date-fns/locale'
import flow from 'lodash/flow'

import BaseFile, { BaseFileConnectors } from './../base-file.js'
import { fileSize } from './utils.js'
import { t } from 'i18next'

class RawTableFile extends BaseFile {
  handleKeyPress = (event) => {
		if(event.key == 'Enter'){
		  event && event.preventDefault()
      event && event.stopPropagation()
			this.handleRenameSubmit(event)	
		}
	}
  render() {
    const {
      isDragging, isDeleting, isRenaming, isOver, isSelected,
      action, url, browserProps, connectDragPreview,
      depth, size, modified, isShared,
    } = this.props
    const icon = browserProps.icons[this.getFileType()] || browserProps.icons.File
    const inAction = (isDragging || action)
    const iconShared = browserProps.icons[isShared ? 'Shared' : 'SharedTo']
    const ConfirmDeletionRenderer = browserProps.confirmDeletionRenderer

    let name
    if (!inAction && isDeleting && browserProps.selection.length === 1) {
      name = (
        <ConfirmDeletionRenderer
          handleDeleteSubmit={this.handleDeleteSubmit}
          handleFileClick={this.handleFileClick}
          url={url}
        >
          {icon}
          {this.getName()}
        </ConfirmDeletionRenderer>
      )
    } else if (!inAction && isRenaming) {
      name = (
        <form className="renaming" onSubmit={this.handleRenameSubmit}>
          {icon}
          <input
            ref={this.selectFileNameFromRef}
            type="text"
            value={this.state.newName}
            onChange={this.handleNewNameChange}
            onBlur={this.handleCancelEdit}
            onKeyPress={this.handleKeyPress}
            autoFocus
          />
        </form>
      )
    } else {
      name = (
        <a
          href={url || '#'}
          download="download"
          onClick={this.handleFileClick}
        >
          {icon}
          {this.getName()}
        </a>
      )
    }

    let draggable = (
      <div>
        {name}
      </div>
    )
    if (typeof browserProps.moveFile === 'function') {
      draggable = connectDragPreview(draggable)
    }

    const row = (
      <tr
        className={ClassNames('file', {
          pending: action,
          dragging: isDragging,
          dragover: isOver,
          selected: isSelected,
        })}
        onClick={this.handleItemClick}
        onDoubleClick={this.handleItemDoubleClick}
      >
        <td className="name">
          <div style={{ paddingLeft: (depth * 16) + 'px' }}>
            {draggable}
          </div>
        </td>
        <td className='shared'>
          <div>
          <a onClick={this.handleFileClick} title={isShared ? t('main.shared') : t('main.sharedto')}>
            {iconShared}
          </a>
          </div>
        </td>

        <td className="size">{fileSize(size)}</td>
        <td className="modified">
          {typeof modified === 'undefined' ? '-' : formatRelative(modified, new Date(), { locale: ru }) //formatDistanceToNow(modified, { addSuffix: true }, {locale: ru})
          }
        </td>
      </tr>
    )

    return this.connectDND(row)
  }
}

const TableFile = flow(
  DragSource('file', BaseFileConnectors.dragSource, BaseFileConnectors.dragCollect), 
  DropTarget(['file', 'folder', NativeTypes.FILE], BaseFileConnectors.targetSource, BaseFileConnectors.targetCollect)
)(RawTableFile)

export default TableFile
export { RawTableFile }
