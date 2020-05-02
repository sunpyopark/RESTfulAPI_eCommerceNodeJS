var express  = require('express');
var router   = express.Router();
var Cart     = require('../models/cart');
var mongoose = require('mongoose');

// Index
router.get('/',
  function(req, res, next){
    var query = {};
    if(req.query.name) query.name = {$regex:req.query.name, $options:'i'};

    Cart.find(query)
    .sort({id: 1})
    .exec(function(err, carts){
      if(err) {
        res.status(500);
        res.json({success:false, message:err});
      }
      else {
        res.json({success:true, data:carts});
      }
    });
  }
);

// Show Cart
router.get('/:id',
  function(req, res, next){
    Cart.findOne({id:req.params.id})
    .exec(function(err, cart){
      if(err) {
        res.status(500);
        res.json({success:false, message:err});
      }
      else if(!cart){
        res.json({success:false, message:"cart not found"});
      }
      else {
        res.json({success:true, data:cart});
      }
    });
  }
);

// Create Cart
router.post('/',
  function(req, res, next){
    Cart.findOne({})
    .sort({id: -1})
    .exec(function(err, cart){
      if(err) {
        res.status(500);
        return res.json({success:false, message:err});
      }
      else {
        res.locals.lastId = cart?cart.id:0;
        next();
      }
    });
  },
  function(req, res, next){
    var newCart = new Cart(req.body);
    newCart.id = res.locals.lastId + 1;
    newCart.save(function(err, cart){
      if(err) {
        res.status(500);
        res.json({success:false, message:err});
      }
      else {
        res.json({success:true, data:cart});
      }
    });
  }
);

// Update Cart
router.put('/:id',
  function(req, res, next){
    Cart.findOneAndUpdate({id:req.params.id}, req.body)
    .exec(function(err, cart){
      if(err) {
        res.status(500);
        res.json({success:false, message:err});
      }
      else if(!cart){
        res.json({success:false, message:"Cart not found"});
      }
      else {
        res.json({success:true});
      }
    });
  }
);

// Destroy Cart
router.delete('/:id',
  function(req, res, next){
    Cart.findOneAndRemove({id:req.params.id})
    .exec(function(err, cart){
      if(err) {
        res.status(500);
        res.json({success:false, message:err});
      }
      else if(!cart){
        res.json({success:false, message:"Cart not found"});
      }
      else {
        res.json({success:true});
      }
    });
  }
);

module.exports = router;
