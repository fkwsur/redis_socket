import './App.css';
import socketio from "socket.io-client";
import {Component} from "react";

const socket = socketio.connect("http://localhost:8081"); 

class App extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      message : '',
      list : [],
    }
  }

  componentDidMount(){
    socket.on('msg', (obj) => {
      const logs = this.state.list;
      obj.key = 'key_' + (this.state.list.length + 1);
      logs.unshift(obj);
      this.setState({list : logs});
    })
  }


  TextChange = (e) => {
    let nextState ={};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  send = (e) => {
    e.preventDefault();
    socket.emit('msg',{
      message : this.state.message
    })
    this.setState({
      message : ''
    })
  }

  render(){
    const msglog = this.state.list.map(k => (
      <div key={k.key}>
        <p>{k.message}</p>
      </div>
    ))

  return (
    <div className="App">
      <input type="text" name="message" value={this.state.message} onChange={this.TextChange}/>
      <button type="submit" value="submit" onClick={this.send}>버튼이요</button>

      {msglog}
    </div>
  );
    }
}

export default App;
