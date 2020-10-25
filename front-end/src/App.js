import './App.css';
import Camera from './components/Camera'
import Card from './components/Card'
import React from 'react';
import logo from './logo.png';


class App extends React.Component {
  state = {
    data: "",
    dataUri: ""
  }
  constructor(props) {
    super(props)
    this.myCardRef = React.createRef();
}

  componentDidUpdate(prevState) {
    if ((prevState.data !== this.state.data)
      &&(this.state.data !== "")){
        this.scrollToCard();
    }
  }

  setData = (arg) => {
    this.setState(arg);
  }

  refreshImage = () => {
    this.setState({data:"", dataUri: ""})
  }
  scrollToCard = () => {
    var scrollPoint = document.getElementById("scrollPoint");
    scrollPoint.scrollIntoView({behavior: "smooth"});
  }
  render() {
    return (
      <div className="App">
        <img className="App-logo" src={logo} alt="Smart Recycle"/>
        <Camera ref={this.myCardRef} setData={this.setData} dataUri={this.state.dataUri}/>
        {
        this.state.data
          ?
          <Card data={this.state.data} refreshImage={this.refreshImage}/>
          :
          null
        }
      </div>
    );
  }
}

export default App;
