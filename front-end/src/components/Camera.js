import React from 'react';
import Camera, {FACING_MODES} from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import PropTypes from 'prop-types';
import axios from 'axios';
import { host } from '../config'

const ImagePreview = ({ dataUri, isFullscreen }) => {
  let classNameFullscreen = isFullscreen ? 'demo-image-preview-fullscreen' : '';

  return (
    <div className={'demo-image-preview ' + classNameFullscreen}>
      <img src={dataUri} alt="demo"/>
    </div>
  );
};

ImagePreview.propTypes = {
  dataUri: PropTypes.string,
  isFullscreen: PropTypes.bool
};

class MyCamera extends React.Component {
  state = {

  }

  handleTakePhotoAnimationDone = (dataUri) => {
    axios.post(host+'/api/image/', { image: dataUri }).then(result => {
      if (Object.keys(result.data).length !== 0) {
        this.props.setData({ data: result.data });
      }
    }).catch(error => {
      this.props.setData({data: {page_name: "server_not_responding"}});
    })
    this.props.setData({dataUri: dataUri});
  }

  render() {
    const isFullscreen = false;
    return (
      <div>
        {
          (this.props.dataUri)
            ? <ImagePreview dataUri={this.props.dataUri}
              isFullscreen={isFullscreen}
            />
            : <Camera onTakePhotoAnimationDone={this.handleTakePhotoAnimationDone}
              isFullscreen={isFullscreen}
              idealFacingMode = {FACING_MODES.ENVIRONMENT}
            />
        }
      </div>
    );
  }
}

export default MyCamera;