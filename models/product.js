var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  shipping_cost: {
    type: Number,
    required: true,
  },
});

var Product = mongoose.model('product', productSchema);
module.exports = Product;
