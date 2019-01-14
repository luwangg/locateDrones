const {velocity,radius} = require('../../src/config/droneParams');

module.exports = (initPosition) => {
  const time = new Date().getTime();
  const theta = ((velocity*time) % (2*Math.PI*radius))/radius;
  const x = initPosition.x - radius*(Math.cos(theta));
  const y = initPosition.y - radius*(Math.sin(theta));
  //console.log(`(${x},${y}),`);
  return {x,y}
}

