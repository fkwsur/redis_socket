import './App.css';
import React from "react";
import Room from "./component/Room";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {InRoom} from './component/InRoom.jsx';
import RoomList from './component/RoomList.jsx';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>  
          <Route exact path="/" component={Room}/>
          <Route exact path="/InRoom" component={InRoom}/> 
          <Route exact path="/RoomList" component={RoomList}/> 
        </Switch>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
       