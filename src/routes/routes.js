const uuid = require('uuid');
const {mongoose} = require('../../db/util/mongoose');
const {getAllDronesPosition} = require('../../db/util/dronesPosition');
require('../../db/models/Drone');

const Drone = mongoose.model('Drone');

module.exports = (app)=>{
  app.get('/', (req,res)=>{
    console.log('!Called GET / ');
    res.status(200).send('Welcome!!!');
  });  

  app.post('/drone', (req,res)=>{
    console.log(`POST /drone called : ${JSON.stringify(req.body,undefined,2)}`);    
    const drone = new Drone({...req.body, droneId : uuid()});
    drone.save().then(
      (data)=>{
        console.log(`Saved to DB : ${data}`);
        res.status(200).send(req.body);
      },
      (err) =>{
        console.log(`Error while saving drone : ${err}`);
        res.status(400).send(err);
      }
    );    
  });

  app.delete('/drone/:name', (req,res)=>{
    console.log(`DELETE /drone called : ${req.params.name}`);   
    const id = req.params.name; 
    Drone.findOneAndDelete({name : id}).then(
      (drone)=>{
        console.log(`Deleted Drone : ${id}`);
        res.status(200).send(drone);
      },
      (err)=>{
        console.log(`Error while deleting drone : ${id}`);
        res.status(400).send(err);
      }
    );    
  });

  app.delete('/drones', (req,res)=>{
    console.log(`DELETE /drones called`);    
    Drone.remove({}).then(
      (drones)=>{
        console.log(`Deleted Drone : ${drones}`);
        res.status(200).send(drones);
      },
      (err)=>{
        console.log(`Error while deleting drones`);
        res.status(400).send(err);
      }
    );    
  });

  app.get('/drones',(req,res)=>{
    console.log('Called GET /drones');
    getAllDronesPosition().then((drones)=>{
      console.log('drone route res',drones);
      //res.status(200).send(drones);
      res.status(200).send(JSON.stringify(drones,undefined,2));
    });
    
    /*Drone.find({})
              .then(
                (drones)=>{
                  if(!drones){
                  }
                  console.log(JSON.stringify(drones,undefined,2));
                  const dronesResponse = drones.map(({initalPosition,name,quadrant})=>(
                      {
                        currentPosition: getDronePosition(initalPosition),
                        id : name,
                        quadrant
                      }
                    )
                  );                 
                  res.status(200).send(dronesResponse);
                },
                (err)=>{
                  res.status(404).send(err);
                } 
              );    
              */
  });

  app.get('/drone/:name',(req,res)=>{
    console.log('Called GET /drone/${req.params.name}');
    console.log(req.params.name);
    Drone.find({name : req.params.name})
              .then(
                (drone)=>{
                  if(!drone){
                  }
                  console.log(JSON.stringify(drone,undefined,2));
                  res.status(200).send(JSON.stringify(drone,undefined,2));
                },
                (err)=>{
                  res.status(404).send(err);
                }
              );    
  });
}