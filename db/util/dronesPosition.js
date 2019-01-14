const mongoose = require('mongoose');
const calculateDronePosition = require('./calculateDronePosition');
require('./../models/Drone');
const Drone = mongoose.model('Drone');

const getAllDronesPosition = () => {
  return (
    Drone.find({})
    .then(
      (drones)=>{
        console.log('drones res', drones);
        if(!drones){
          console.log('No Drones found. GET /drones');
          return [];
          //
        }      
        const dronesResponse = drones.map(({droneId,initalPosition,name,quadrant})=>(
            {              
              droneId,
              name,
              quadrant,
              initalPosition,             
              currentPosition: calculateDronePosition(initalPosition)
            }
          )
        );
        return dronesResponse;      
      },
      (err)=>{
        console.log('error while getting GET /drones');
        return [];
      } 
    )
  )
}

module.exports = {getAllDronesPosition}; 