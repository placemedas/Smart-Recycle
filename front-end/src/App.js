import './App.css';
import Camera from './components/Camera'

import Card from './components/Card'
import React from 'react';
import axios from 'axios';
import logo from './logo.png';


class App extends React.Component {
  state = {
    data: ""
  }

  componentDidMount() {
    if (Object.keys(this.state.data).length === 0) {

    }
  }

  setData = (arg) => {
    this.setState(arg);
  }

  render() {
    const { data } = this.state;

    return (
      <div className="App">
        <img className="App-logo" src={logo} alt="Smart Recycle" style={{maxWidth: 200, maxHeight: 200}} />
        <Camera setData={this.setData} />
        {
        data
          ?
          <Card data={data} />
          :
          null
        }
      </div>
    );
  }
}

export default App;
