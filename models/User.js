const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const UserSchema = new Schema({

  name:{
    type: String,
    required:[true, 'Name is required'],
  },
  lastName:{
    type: String,
    required:[true, 'Last Name is required'],
  },
  image :{
    type: String,
    required:[ true, 'Picture needed'],
  },
  email:{
    type: String,
    required:[true, 'email required'],
  },
  phone:{
    type:Number,
    required:[true, 'phone number needed!'],
  },
  password:{
    type: String,
    required: [true, 'Password required']
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const User = mongoose.model('User', UserSchema);
module.exports = User;