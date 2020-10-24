import React, { useState } from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import PropTypes from 'prop-types';
import axios from 'axios';

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
    dataUri: ""
  }

  handleTakePhotoAnimationDone = (dataUri) => {
    axios.post('http://localhost:3000/api/image/', { image: dataUri }).then(result => {
      if (Object.keys(result.data).length !== 0) {
        this.props.setData({ data: JSON.stringify(result.data) });
        console.log(result.data);
      }
    })
    this.setState({dataUri: dataUri});
  }

  render() {
    const isFullscreen = false;
    return (
      <div>
        {
          (this.state.dataUri)
            ? <ImagePreview dataUri={this.state.dataUri}
              isFullscreen={isFullscreen}
            />
            : <Camera onTakePhotoAnimationDone={this.handleTakePhotoAnimationDone}
              isFullscreen={isFullscreen}
            />
        }
      </div>
    );
  }
}

export default MyCamera;