const express = require('express');
const app = express();
const cors = require('cors');
const Router = require('./routes');
const db = require('./models');

db.sequelize
.authenticate()
.then(async () => {
  console.log('db connect ok');
  await db.sequelize.sync({ force : false });
}) 
.catch(err => {
  console.log('db' + err);
});

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cors());
app.use('/api/list', Router.roomlistRouter);

const http_server = require('http').createServer(app).listen(8081);

const socket = require('./services/socket');

socket.io.attach(http_server,{
  cors : {
    origin : 'http://localhost:3000',
    methods : ["GET", "POST"]
  }
});

socket.Wow();
