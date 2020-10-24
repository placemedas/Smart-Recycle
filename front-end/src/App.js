import './App.css';
import Camera from './components/Camera'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

class App extends React.Component {
  state = {
    data: {}
  }

  componentDidMount() {
    if (Object.keys(this.state.data).length === 0) {
      axios.post('http://localhost:3000/api/image').then(result => {
        this.setState({ data: result.data });
      })
    }
  }

  renderData = item => {
    if (!item || !item.value || !item.value.en) return null;
    return (
      <span>{item.value.en}</span>
    );
  }

  render() {
    const {data} = this.state;

    return (
      <div className="App">
        <Camera />
        {
          Object.keys(data).length !== 0
            ?
            data.opts.variables.map(item => {
              return this.renderData(item)
            })
            :
            null
        }
      </div>
    );
  }
}

export default App;
