const db = require('../models');

const show =(req , res)=>{
  if(!req.session.currentUser) return res.status(401).json({
    status: 401,
    message: 'Unauthorized. Please login and try again',
  });

  db.User.findById(req.session.currentUser.id,(err,foundUser)=>{
    if(err) return res.status(500).json({
      status:500,
      message: err,
    });

    res.status(200).json({
      status:200,
      data: foundUser,
    });
  });
};

const userUpdate = (req, res) => {
  if(!req.session.currentUser) return res.status(401).json({
      status: 401,
      message: 'Pleast Try Again!'
  });
  db.User.findByIdAndUpdate(req.params.id,
    req.body, { new: true }, 
    (error, updatedUser)=>{
      if(error) return console.log(error)
      res.json({
        status: 200,
        count:1, 
        date:updatedUser,
        requestAt: new Date().toLocaleString(),
      });
    });
}
//Delete Current User
const userDelete = (req, res) => {
  db.User.deleteOne({ User: req.params.User }, (err) => {
      if(err) return console.log(err);
      res.json({
          status: 200,
          message: 'Being Processed'
      });
  });
};

module.exports= {
  show,
  userDelete,
  userUpdate,
};