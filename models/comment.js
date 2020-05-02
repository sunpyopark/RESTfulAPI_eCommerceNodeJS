var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
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
  rating: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

var Comment = mongoose.model('comment', commentSchema);
module.exports = Comment;
