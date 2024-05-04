const Auction = require("../models/Auction");
const User=require("../models/User");
const Player = require('../models/Player')
// const bcrypt = require('bcrypt');
// const getAuction = async (req, res) => {
//     try {
//       const AuctionData = await Auction.find({});
//       return res.json(AuctionData);
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: "Server Error" });
//     }
//   };

  const getAuctionByPlayer = async (req, res) => {
    try {
      const _id = req.params.id
      const user = await Player.find({userId:_id});

      const player_Id = user[0]._id;
      const playerBid = await Auction.find({playerId:player_Id})

      // console.log(playerBid)
      res.status(201).send(playerBid)
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };

  const PlayerAuction = async (req, res) => {

    // console.log(req.body);
    let {bidder,bidAmount,userId,playerId,email,description,currentBid} = req.body
    let startingBid = req.body.startingBid
    try {
      const bid= await Auction.find({userId});


      if(bid.length>1){
        return res.status(400).json({success:false,message:"Already Bid on Player"});
      }
      // console.log(email)
      const bids = {bidder,bidAmount,userId}
      const playerExtradata = await Player.find({email})
      const imageUrl = playerExtradata[0].imageUrl 
      const endDate = '05-05-2024'
      const title = 'Player Auction'
      const data = await Auction.find({playerId}).sort({ createdAt: 1 });
      const start_bid = data[0].startingBid;
      // console.log(start_bid);
      // console.log(typeof(startingBid))
      if(start_bid){
        startingBid = start_bid
      }
      else{
        startingBid = startingBid
      }
      await Auction.create({...req.body,startingBid,imageUrl,endDate,title,bids})
      // userdata=await User.create({...req.body, password: hash})
      // await Player.create({...req.body,userId:userdata.id});
      return res.status(201).send('Sucessfully account opened ')
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server Error" });
    }
  };
  module.exports = {getAuctionByPlayer,PlayerAuction};