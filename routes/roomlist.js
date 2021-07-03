const router = require('express').Router();
const { roomlistController :controller } = require('../controller');

router.get('/', controller.RoomList);
router.post('/create', controller.RoomCreate);
module.exports = router;