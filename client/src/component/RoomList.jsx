import React, { useEffect, useState } from "react";
import { withRouter } from 'react-router-dom';
import store from '../store'
import axios from 'axios';
import socketio from "socket.io-client";

const socket = socketio.connect("http://localhost:8081/");


const RoomList = ({ history }) => {
	const [roomList, setRoomList] = useState([]);
	const [roomName, setRoomName] = useState('');
	const [userList, setUserList] = useState([]);

	const handleClick = async () => {
		store.dispatch({
			type: 'roomInfo',
			userName: store.getState().userName,
			roomName: roomName
		})
		await axios.post('/api/list/create', {
			roomname: store.getState().roomName
		})
			.then((res) => {
				try {
					console.log('성공')
				} catch {
					console.log('실패')
				}
			}).catch((err) => {
				console.log(err);
			})
		history.push("/InRoom");
	}

	useEffect(() => {
		socket.emit('intotheroom', {
			data: store.getState().userName,
		});



		socket.emit('userlist', {});
		socket.on('userlist', (obj) => {
			console.log(`${obj} = obj`);
			setUserList(userList => [...userList, obj]);

			Hmm()
		});


	}, []);

	const Hmm = async () => {
		await axios.get('/api/list')
			.then(res => {
				setRoomList(res.data);
				console.log(roomList);
			})
			.catch(err => {
				console.log(err);
			})
	}

	const intoRoom = (roomname) => {
		console.log(roomname);
		console.log('▲');
		store.dispatch({
			type: 'roomInfo',
			userName: store.getState().userName,
			roomName: roomname
		})
		history.push("/InRoom");
		// store.dispatch({type : 'roomInfo', roomlist : roomList.roomname})

		// store.getState().userName
		// history.push("/InRoom");
	}

	return (
		<>
			<form>
				방이름
				<input type="text" name="roomName" value={roomName} onChange={e => setRoomName(e.target.value)} required />
				<button type="submit" value="submit" onClick={handleClick}>방생성버튼이요</button>
			</form>
			{/* <button><Link to="/RoomList">리스트</Link></button> */}
			<h2>접속유저리스트</h2>
			<p>{userList}</p><br />


			<div>
				<h2>room list</h2>
				{roomList.map(k => {
					return (
						<>
							<button onClick={(e) => intoRoom(k.roomname)}>{k.roomname}</button><br />
						</>
					)
				})
				}
			</div>

		</>
	)
}

export default withRouter(RoomList);