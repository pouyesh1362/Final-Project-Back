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
const index = (req, res) => {
  db.User.find({}, (err, allUsers) => {
    if (err) return console.log(err);
    res.json({
      status: 200,
      message: 'Show all users',
      requestedAt: new Date().toLocaleString(),
      count: allUsers.length,
      data: allUsers,
    });
  });
};

module.exports= {
  show,
  index,
};