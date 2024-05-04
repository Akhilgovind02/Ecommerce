const Player = require("../models/Player");
const User=require("../models/User");
const bcrypt = require('bcrypt');
const Auction = require('../models/Auction')
const getPlayer = async (req, res) => {
    try {
      const player = await Player.find({});
      return res.json(player);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server Error" });
    }
  };

  const getPlayerById = async (req, res) => {
    try {
      const player = await Player.findById(req.params.id);
  
      res.json(player);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };

  const registerPlayer = async (req, res) => {
    const {firstname,lastname,email,phone,sports,description,price,status,imageUrl,password} = req.body
    try {
      const player= await Player.find({email,phone});
      if(player.length>1){
        return res.status(400).json({success:false,message:"Player Already Exists"});
      }
      const hash = await bcrypt.hash(password, 8)
      console.log(req.body)
      userdata=await User.create({...req.body, password: hash})
      await Player.create({...req.body,userId:userdata.id});
      return res.status(201).send('Sucessfully account opened ')
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server Error" });
    }
  };
  module.exports = {getPlayer, registerPlayer,getPlayerById};