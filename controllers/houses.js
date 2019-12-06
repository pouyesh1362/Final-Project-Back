const db = require('../models');

const show = (req ,res)=>{
    db.House.find({} , (error , allHouses)=>{
      if(error) return console.log(error);
      res.json({
        status: 200,
        count: allHouses.length,
        data: allHouses,
        requestAt: new Date().toLocaleString(),
      }); 
    });
  }

  const create = (req, res)=>{
    db.House.create(req.body, (error, createdHouse)=>{
      if(error) return consle.log(error);
      res.json({
        status: 200,
        count: createdHouse.length,
        data:createdHouse,
        requestAt: new Date().toLocaleString(),
      });
    });
  }

  const destroy = (req,res)=>{
    db.House.findByIdAndDelete(req.params.HouseId, (error,deletedHouse)=>{
      if(error) consle.log(error);
      res.json({
        status: 200,
        count: 1,
        data:deletedHouse,
        requestAt: new Date().toLocaleDateString(),
      });
    });
  }
  
  const update = (req,res)=>{
    db.House.findByIdAndUpdate(req.params.HouseId,
      req.body,
      {new:true},
      (error, updatedHouse)=>{
        if(error) return console.log(error)
        res.json({
          status: 200,
          count:1, 
          date:updatedHouse,
          requestAt: new Date().toLocaleString(),
        });
      });
  }

  const index = (req,res)=>{
    db.House.findById(req.params.HouseId, (error, Housefound)=>{
      if(error) return console.log(error);
      res.json({
        status: 201,
        data: Housefound,
        requestAt: new Date().toLocaleString()
      });
    });
  }

  module.exports = {
      show,
      destroy,
      update,
      create,
      index,
  }