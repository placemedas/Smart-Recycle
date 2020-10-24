import logo from './logo.svg';
import './App.css';
import Camera from './components/Camera'
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});

  useEffect(()=> {
    if (!data) {
      axios.post('http://localhost:3000/api/image').then(result => {
      console.log(result);
      setData(result);
    }).catch(err => {
      console.log(err);
    });
    }
  })

  return (
    <div className="App">
      <Camera />
    </div>
  );
}

export default App;
