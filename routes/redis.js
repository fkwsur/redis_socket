const router = require('express').Router();
/**
const redis = require('redis').createClient('6379','127.0.0.1');

redis.on('error', (err) => {
	console.log(err);
});

//get, set
// get 은 db에 select
// set 은 insert랑 같아.
// key, value 로 저장을하는데 json형식처럼
// 같은 key를 쓰면 최신데이터가 그냥 덮어씌워짐

router.post('/set_data', (req,res) => {
	let { data } = req.body;
	const rows = redis.set('first_set',data);
	res.json({result : true});
});

router.get('/get_data', (req, res) => {
	const rows = redis.get('first_set', (err, reply) => {
		if(err) console.log(err);
		res.json({result : reply});
	})
});

router.post('/set_name', (req,res) => {
	let {name} = req.body;
	const rows = redis.set('name',name);
	res.json({result : true});
});

router.get('/get_name', (req,res) => {
	const rows = redis.get('name', (err, reply) => {
		if(err) console.log(err);
		res.json({result : reply});
	})
});
*/
module.exports = router;