const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');

const cors = require('./db/util/cors');
const {getAllDronesPosition} = require('./db/util/dronesPosition');

require('./src/config/config');

const PORT = process.env.PORT;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
app.use(bodyParser.json());
app.use(cors());

io.on('connection', (socket) => {
  console.log('New user connected');  
  setInterval(()=>{
    getAllDronesPosition()
      .then((drones)=>{
        socket.emit('nextPosition',{
          data : data1,
          dronesPosition : drones
        });
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

   