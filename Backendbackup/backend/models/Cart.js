const mongoose = require('mongoose')
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    productId: {
      type: mongoose.Types.ObjectId,
      ref: 'product',
      required: true,
    },
    count: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const Cart = mongoose.model('cart', cartSchema)
module.exports = Cart
