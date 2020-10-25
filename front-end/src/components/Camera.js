import React from 'react';
import Camera, {FACING_MODES} from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import PropTypes from 'prop-types';
import axios from 'axios';
import { host } from '../config';
import './Card.css';
import Paper from '@material-ui/core/Paper';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';

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
    error: false
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

  handleCameraError = (error) => {
    if (error) {
      this.setState({error: true})
    };
  }

  displayCamera = (isFullscreen) => {
    if (this.state.error) {
      return (
        <Paper className="bottomPaper" elevation={3}>
          <Card className="bottomCard" variant="outlined">
            <CardContent>
              <Typography variant="h6" component="h4" style={{color: 'red'}}>
              {"Please check your camera permissions and then reload"}
              </Typography>
            </CardContent>
          </Card>
        </Paper>
      )
    } else {
      return (
        <Camera onTakePhotoAnimationDone={this.handleTakePhotoAnimationDone}
              isFullscreen={isFullscreen}
              isImageMirror ={window.matchMedia("(min-width: 568px)").matches}
              idealFacingMode = {FACING_MODES.ENVIRONMENT}
              onCameraError={this.handleCameraError}
            />
      )
    }
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
            : this.displayCamera(isFullscreen)
        }
      </div>
    );
  }
}

export default MyCamera;