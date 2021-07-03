import { createStore } from 'redux'

export default createStore(function(state,action){
	if(state === undefined || 0 || ''){
		return { userName : '', roomName : '', }
	}

		// userName : userName, roomName : ''
	if(action.type === "userName"){
		return {...state, userName : action.userName }
	}
	// roomName : roomName userName : ''
	if(action.type === 'only_room'){
		return {...state , roomName : action.roomName}
	}
	// userName : '', roomName : roomName

	if(action.type === "roomInfo"){
		return {...state, userName : action.userName, roomName : action.roomName}
	}

	// if(action.type === "rooms"){
	// 	return {...state, roomList : action.roomList}
	// }

	return state;
});
