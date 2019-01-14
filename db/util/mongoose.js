const mongoose = require('mongoose');
const {Schema} = mongoose;

require('../../src/config/config');

mongoose.Promise = global.Promise;
//const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/housinganywhere';
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
module.exports = {mongoose,Schema}