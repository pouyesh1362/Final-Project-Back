const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const HouseSchema = new Schema ({
image:{
  type: String,
  required:[true , 'Image is required'],
},
price: {
  type: Number,
  required:[true , 'Price is required'],
},
Room:{
  type:Number,
  required:[true, 'Room number is required'],
},
state:{
    type:String,
    required:[ true, 'State is required']
},
City:{
    type:String,
    required:[true, 'City required'],
},
ZipCode:{
    type:Number,
    required:[true, 'Zip Code required']
},
owner:{
type: mongoose.Schema.Types.ObjectId,
ref:'User'
},
renter:{
  type: mongoose.Schema.Types.ObjectId,
  ref:'User'
}
})

const House = mongoose.model('House', HouseSchema);
module.exports = House;
