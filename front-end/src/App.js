import './App.css';
import Camera from './components/Camera'
import React, { useEffect, useState } from 'react';


class App extends React.Component {
  state = {
    data: {}
  }

  componentDidMount() {
    if (Object.keys(this.state.data).length === 0) {
     
    }
  }

  renderData = item => {
    if (!item || !item.value || !item.value.en) return null;
    return (
      <span>{item.value.en}</span>
    );
  }

  setData = (arg) => {
    this.setState(arg);
  }

  render() {
    const {data} = this.state;

    return (
      <div className="App">
        <Camera setData={this.setData} />
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
