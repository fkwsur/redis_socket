const { roomlist } = require('../models');
const { handler } = require('../utils');
const { errorHandler } = handler;
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	
	RoomList : async (req, res) =>{
		try {
			const rows = await roomlist.findAll();
			if(rows) return res.status(200).send(rows);
			else throw { code : 1 } ; 
		} catch (err) {
			return res.status(400).send(errorHandler(err));
		}
	},
	RoomCreate : async (req, res) => {
		try {
			console.log(req);
			let {roomname} = req.body;
			const rows = await roomlist.create({
					roomname : roomname
			})
			if(rows)return res.send('1');
			else throw { code : 3 }
		} catch (error) {
			console.log(error);
			return res.status(400).send(errorHandler(error));
		}
	}
}