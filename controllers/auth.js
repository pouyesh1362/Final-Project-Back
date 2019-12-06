const bcrypt = require('bcryptjs');
const db = require('../models');

const register = (req,res) => {
  if(!req.body.name || !req.body.lastName || !req.body.image || !req.body.email || !req.body.phone || !req.body.password){
    return res.status(400).json({status : 500, message : 'Please complete all required info!'});
  }
  db.User.findOne({email:req.body.email}, (err,foundUser)=>{
    if (err)return res.status(500).json({status: 500, message: 'Something went wrong. Please try again'})

    if(foundUser) return res.status(400).json({status: 400, message: 'You might try log in !'});

    //Generate Salt 
   bcrypt.genSalt(10,(err,salt)=>{
     if (err) return res.status(500).json({status: 500, message: 'Something went wrong. Please try again'});
      bcrypt.hash(req.body.password, salt, (err,hash)=>{
        if (err) return res.status(500).json({status: 500, message: 'Something went wrong.Please try again!'});

        const newUser ={
          name:req.body.name,
          lastName:req.body.lastName,
          image:req.body.image,
          email:req.body.email,
          phone:req.body.phone,
          password: hash,
        }
        db.User.create(newUser,(err, saveUser)=>{
          if(err) return res.status(500).json({status:500, message:err});
          res.sendStatus(201)
        });
      });  
   });
  });
};

const login =(req, res)=>{
  if(!req.body.email || !req.body.password){
    return res.status(400).json({status: 400, message: 'Please enter your Email and Password'
    })
  }
  db.User.findOne({email:req.body.email},(err,foundUser)=>{
    if (err) return res.status(500).json({status: 500, message:'Something went wrong, Please try again'});

    if (!foundUser){
      return res.status(400).json({status: 400, message: 'User Name password is wrong.Please try again! '});
    }
    bcrypt.compare(req.body.password, foundUser.password, (err,isMatch)=>{
        if (isMatch){
          req.session.currentUser = {id: foundUser._id};
          return res.status(200).json({status:200, message:'success', data: foundUser._id})
        }else {
          return res.status(400).json({status: 400, message: 'Username and password is incorrect'});
        }
      });
  });
};

const logout = (req, res) => {

  if (!req.session.currentUser) return res.status(401).json({status:401, message: 'Unauthorized'});
  req.session.destroy((err)=>{
    if (err) return res.status(500).json({status: 500, message: 'Something went wrong! Please try again.'});
  });
}

const verify = (req, res) => {
  if (!req.session.currentUser) return res.status(401).json({ status: 401, message: 'Unauthorized' });
  res.status(200).json({
    status: 200,
     message: `Current User verified.User ID: ${req.session.currentUser.id}`
  });
};

module.exports ={
  register,
  login,
  logout,
  verify,
}