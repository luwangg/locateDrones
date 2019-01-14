const {velocity,radius} = require('../../src/config/droneParams');

module.exports = (initPosition) => {
  const time = new Date().getTime();
  const theta = ((velocity*time) % (2*Math.PI*radius))/radius;
  const x = (initPosition.x - radius*(Math.cos(theta))).toFixed(2);
  const y = (initPosition.y - radius*(Math.sin(theta))).toFixed(2);  
  //console.log(`(${x},${y}),`);
  return {x,y}
}

