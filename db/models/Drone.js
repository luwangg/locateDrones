const {mongoose,Schema} = require('../util/mongoose');

const DroneSchema = new Schema({
  droneId : {
    type : String,
    trim : true,
    required : false
  },
  initalPosition : {
    x: {
      type : Number,
      trim : true,
      required : [true, 'X coordinate is required'] 
    },
    y: {
      type : Number,
      trim : true,
      required : [true, 'Y coordinate is required'] 
    }
  },
  quadrant : {
    type : Number,
    trim : true,
    required : [true, 'Quadrant is required'],
    validate : {
      validator : (quadrant) => {
        return (quadrant > 0 && quadrant < 5);
      },
      message : props => `${props.value} is is not valid quadrant, valid value can be between one and four.`
    }
  },
  name : {
    type : String,
    trim : true,
    unique : true
  }
});
const Drone = mongoose.model('Drone',DroneSchema);

module.exports = {Drone}

