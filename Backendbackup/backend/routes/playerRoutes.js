const express = require("express");
const router = express.Router();
 const {getPlayer, registerPlayer,getPlayerById}= require("../controller/player.controller");

router.get("/",getPlayer);
router.post("/registerPlayer", registerPlayer);
router.get("/:id", getPlayerById);


module.exports = router;
