import socketio from "socket.io-client";
import React,{useEffect, useState} from "react";
import store from '../store';

const socket = socketio.connect("http://localhost:8081"); 

export const InRoom = () => {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

		
	useEffect(() => {
    socket.on('msg', (obj) => {
      setMessageList(messageList => [...messageList, obj]);
    });
    socket.emit('roomName',{ roomInfo : store.getState().roomName})
		// socket.emit('roomName',{ roomInfo : store.getState().roomName})
	}, []);

  // const get_msg = (e) => {
 
  // }


  const onSubmit = (e) => {
    e.preventDefault();
    socket.emit('msg', {
      name : store.getState().userName,  
      roomName : store.getState().roomName,  
      message : message
    });
    setMessage('');
		
  }

  return (
    <div className="App">
      <input type="text" name="message" value={message} onChange={e => setMessage(e.target.value)}/>
      <button type="submit" value="submit" onClick={onSubmit}>버튼이요</button>
      {messageList.map(k => {
				return(
				<>
				 <h2>{k.roomName}</h2>
      	 <div key={k.key}>
         <p><span>아이디 : {k.name}</span><br />내용 : {k.message}</p>
      	 </div>
			  </>  
        )})
      }
    </div>
  );
}

       