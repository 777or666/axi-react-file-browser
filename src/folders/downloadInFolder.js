import PropTypes from 'prop-types';
import React from 'react';
import { t } from 'i18next';

class DownloadInFolder extends React.PureComponent {
  constructor(props) {
    super(props);
    this.filePicker = React.createRef();

    this.state = {
      selectedFile: '',
    };
  }

	static propTypes = {
	  select: PropTypes.func,
	  fileKey: PropTypes.string,
		isReadonlyMode: PropTypes.bool,
	  connectDropTarget: PropTypes.func,
	  isOver: PropTypes.bool,
	  isSelected: PropTypes.func,
	  selectedFolder: PropTypes.string,
		icons: PropTypes.object,

	  browserProps: PropTypes.shape({
	  createFiles: PropTypes.func,
	  moveFolder: PropTypes.func,
	  moveFile: PropTypes.func,
	  }),
  }

	handlePick = (event) => {
	  event.preventDefault();
	  this.filePicker.current.click();
	}

	componentDidMount() {
	  this.setState({ selectedFile: this.props.selectedFolder });
	}

	componentDidUpdate(prevProps, prevState) {
	  if (JSON.stringify(this.props.selectedFolder) !== JSON.stringify(prevProps.sselectedFolder)) {
	    this.setState({ selectedFile: this.props.selectedFolder});
	  }
	}

	handleDownloadInFolders(event, functionCreateFiles, key) {
	  event.preventDefault();
	  const files = [...event.target.files];
	  functionCreateFiles(files, key);
	}

	render() {
	  const { selectedFile } = this.state;
	  const { isFolder, isReadonlyMode, icons } = this.props;

	  return (
  <>
    {isFolder && !isReadonlyMode ? (
        <div key="download-i-folder">
          <a
            href="#"
            role="button"
            onClick={this.handlePick}
            style={selectedFile && !isReadonlyMode ? { marginLeft: '20px' } : { display: 'none' }}
          >
            {icons.DownloadInFolder}
             &nbsp;{t('action.downloadinfolder')}
          </a>
      
        <input
          type="file"
          multiple
          ref={this.filePicker}
          onChange={e => this.handleDownloadInFolders(e, this.props.browserProps.createFiles, this.props.selectedFolder)}
          style={{
						  width: '0',
						  height: '0',
						  lineHeight: '0',
						  overflow: 'hidden',
						  padding: '0',
						  margin: '0',
          }}
        />
				  </div>
    ) : <div />}
  </>
	  );
	}
}

export default DownloadInFolder;

