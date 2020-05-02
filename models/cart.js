var mongoose = require('mongoose');

var cartSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  productid: {
    type: Number,
    required: true,
  },
  userid: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  
});

var cart = mongoose.model('cart', cartSchema);
module.exports = cart;
