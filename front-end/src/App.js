import './App.css';
import Camera from './components/Camera'
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});

  useEffect(()=> {
    if (Object.keys(data).length === 0) {
      axios.post('http://localhost:3000/api/image').then(result => {
      setData(result.data);
    }).catch(err => {
    });
    } else {
      console.log(data);
    }
  })

  const renderData = item => {
    if (!item || !item.value || !item.value.en) return null;
    return(
      <span>{item.value.en}</span>
    );
  }

  return (
    <div className="App">
      <Camera />
      {
      Object.keys(data).length !== 0 
      ?
      data.opts.variables.map(item => {
        return renderData(item)})
      : 
      null
      }
    </div>
  );
}

export default App;
