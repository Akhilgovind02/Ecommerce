const mongoose = require('mongoose')
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const bidSchema = new mongoose.Schema({
  bidder: { type: String, required: true },
  bidAmount: { type: Number, required: true },
  bidTime: { type: Date, default: Date.now },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true,
  }
});

const auctionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    playerId: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    description: { type: String, required: true },
    startingBid: { type: Number, required: true },
    currentBid: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    endDate: { type: Date, required: true },
    bids: [bidSchema],
    winner: { type: String },
  },
  {
    timestamps: true,
  }
);

auctionSchema.virtual('timeLeft').get(function () {
  return Math.max(this.endDate - Date.now(), 0);
});

auctionSchema.virtual('highestBid').get(function () {
  if (!this.bids || this.bids.length === 0) {
    return this.startingBid;
  }
  return this.bids[this.bids.length - 1].bidAmount;
});

auctionSchema.virtual('bidder').get(function () {
  if (!this.bids || this.bids.length === 0) {
    return null;
  }
  return this.bids[this.bids.length - 1].bidder;
});

auctionSchema.pre('save', function (next) {
  if (this.timeLeft === 0 && this.bids.length > 0) {
    const winningBid = this.bids[this.bids.length - 1];
    this.winner = winningBid.bidder;
  }
  next();
});

const Auction = mongoose.model('Auction', auctionSchema);

module.exports = Auction
// module.exports = 