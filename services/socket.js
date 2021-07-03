const io = require("socket.io")();
// const redisAdapter = require("socket.io-redis");
const { chatting, roomlist } = require('../models');
const dotenv = require("dotenv");

const redis = require('redis').createClient('6379','127.0.0.1');

redis.on('error', (err) => {
	console.log(err);
});

dotenv.config();

module.exports = {  
  io : io,
  Wow : async() =>{
  io.on('connection', (socket) => {

  socket.on('msg', async (msg) => {
    try{
    console.log(msg);
    await io.to(msg.roomName).emit('msg',msg);
    const rows = await chatting.create({username : msg.name, message : msg.message, roomname : msg.roomName})
    console.log(rows);
    }catch (e) {
			console.log(e);
		}
  });

  socket.on('createroom', async (roomName) => {
    const rows = await roomlist.create({roomname : roomName.roomInfo});
    console.log(rows);
  });

  socket.on('intotheroom', async (data) => {
    try{
      console.log(data.data);
      redis.get('first_set', (err, reply) => {
        if(err) console.log(err);
        let janedoe = [reply];
        janedoe.push(data.data);
        redis.set('first_set', janedoe.toString());
      })
    }catch(e){
      console.log(e);
    }
  });


  socket.on('userlist', async () => {
    try {
      const rows = redis.get('first_set', (err, reply) => {
        if(err) console.log(err);
        if(!reply) return 
        let anjdu = reply.split(',');
        let anjduanjdu = anjdu.filter((element, index) => {
          return anjdu.indexOf(element) === index;
      });
        io.emit('userlist', anjduanjdu);
        // res.send(rows);
      });
    } catch (error) {
      console.log(error)
    }
  });

  socket.on('roomName', async (roomName) => {
    try{
     console.log(roomName);
     socket.join(roomName.roomInfo);
    }catch (e) {
			console.log(e);
		}
  });

  // io.emit("message", message);
  socket.leave();
    socket.on('disconnect', () => {
      console.log('disconnecting');
      redis.flushall();
    });
  });
  }
};
