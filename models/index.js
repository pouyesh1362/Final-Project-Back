const mongoose = require('mongoose');
require('dotenv').config();
const dbUrl = process.env.MONGO_URI;

mongoose.connect(dbUrl,{
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex:true,
  useUnifiedTopology:true,
})
  .then(()=> console.log('MongoDb connected ......'))
  .catch((err)=>console.log(`MongoDb connection ERROR ...${err}`));

module.exports ={
  User: require('./User'),
  House: require('./House')
}





