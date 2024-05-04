const express = require("express");
const router = express.Router();
 const {PlayerAuction,getAuctionByPlayer}= require("../controller/auction.controller");

// router.get("/",getAuction);
router.get('/bid/:id',getAuctionByPlayer)
router.post("/bidding", PlayerAuction);
// router.get("/:id", getPlayerById);


module.exports = router;
