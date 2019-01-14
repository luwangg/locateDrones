const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');

const cors = require('./db/util/cors');
const {getAllDronesPosition} = require('./db/util/dronesPosition');

require('./src/config/config');

const PORT = process.env.PORT;

const data1 =  [
  {
  label: 'somethingA',
  values: [{x: 0, y: 2}, {x: 1.3, y: 5}, {x: 3, y: 6}, {x: 3.5, y: 6.5}, {x: 4, y: 6}, {x: 4.5, y: 6}, {x: 5, y: 7}, {x: 5.5, y: 8}]
  },
  {
  label: 'somethingB',
  values: [{x: 0, y: 3}, {x: 1.3, y: 4}, {x: 3, y: 7}, {x: 3.5, y: 8}, {x: 4, y: 7}, {x: 4.5, y: 7}, {x: 5, y: 7.8}, {x: 5.5, y: 9}]
  }
];

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
app.use(bodyParser.json());
app.use(cors());

io.on('connection', (socket) => {
  console.log('New user connected');  
  setInterval(()=>{
    const drones = getAllDronesPosition();
    socket.emit('nextPosition',{
      data : data1,
      dronesPosition : drones
    });
  }, PORT);
 
  socket.on('disconnect', ()=>{
    console.log('User was disconnected');
  })
});

server.listen(PORT, ()=>{
  console.log(`Express server started at port : ${PORT}`);
});

require('./src/routes/routes')(app);

   