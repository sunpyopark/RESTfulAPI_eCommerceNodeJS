var express  = require('express');
var router   = express.Router();
var Comment     = require('../models/comment');
var mongoose = require('mongoose');

// Index
router.get('/',
  function(req, res, next){
    var query = {};
    if(req.query.name) query.name = {$regex:req.query.name, $options:'i'};

    Comment.find(query)
    .sort({id: 1})
    .exec(function(err, comments){
      if(err) {
        res.status(500);
        res.json({success:false, message:err});
      }
      else {
        res.json({success:true, data:comments});
      }
    });
  }
);

// Show Comment
router.get('/:id',
  function(req, res, next){
    Comment.findOne({id:req.params.id})
    .exec(function(err, comment){
      if(err) {
        res.status(500);
        res.json({success:false, message:err});
      }
      else if(!comment){
        res.json({success:false, message:"Comment not found"});
      }
      else {
        res.json({success:true, data:comment});
      }
    });
  }
);

// Create Comment
router.post('/',
  function(req, res, next){
    Comment.findOne({})
    .sort({id: -1})
    .exec(function(err, comment){
      if(err) {
        res.status(500);
        return res.json({success:false, message:err});
      }
      else {
        res.locals.lastId = comment?comment.id:0;
        next();
      }
    });
  },
  function(req, res, next){
    var newComment = new Comment(req.body);
    newComment.id = res.locals.lastId + 1;
    newComment.save(function(err, comment){
      if(err) {
        res.status(500);
        res.json({success:false, message:err});
      }
      else {
        res.json({success:true, data:comment});
      }
    });
  }
);

// Update Comment
router.put('/:id',
  function(req, res, next){
    Comment.findOneAndUpdate({id:req.params.id}, req.body)
    .exec(function(err, comment){
      if(err) {
        res.status(500);
        res.json({success:false, message:err});
      }
      else if(!comment){
        res.json({success:false, message:"Comment not found"});
      }
      else {
        res.json({success:true});
      }
    });
  }
);

// Destroy Comment
router.delete('/:id',
  function(req, res, next){
    Comment.findOneAndRemove({id:req.params.id})
    .exec(function(err, comment){
      if(err) {
        res.status(500);
        res.json({success:false, message:err});
      }
      else if(!comment){
        res.json({success:false, message:"Comment not found"});
      }
      else {
        res.json({success:true});
      }
    });
  }
);

module.exports = router;
