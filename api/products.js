var express  = require('express');
var router   = express.Router();
var Product     = require('../models/product');
var mongoose = require('mongoose');

// Index
router.get('/',
  function(req, res, next){
    var query = {};
    if(req.query.name) query.name = {$regex:req.query.name, $options:'i'};

    Product.find(query)
    .sort({id: 1})
    .exec(function(err, products){
      if(err) {
        res.status(500);
        res.json({success:false, message:err});
      }
      else {
        res.json({success:true, data:products});
      }
    });
  }
);

// Show Product
router.get('/:id',
  function(req, res, next){
    Product.findOne({id:req.params.id})
    .exec(function(err, product){
      if(err) {
        res.status(500);
        res.json({success:false, message:err});
      }
      else if(!product){
        res.json({success:false, message:"product not found"});
      }
      else {
        res.json({success:true, data:product});
      }
    });
  }
);

// Create Product
router.post('/',
  function(req, res, next){
    Product.findOne({})
    .sort({id: -1})
    .exec(function(err, product){
      if(err) {
        res.status(500);
        return res.json({success:false, message:err});
      }
      else {
        res.locals.lastId = product?product.id:0;
        next();
      }
    });
  },
  function(req, res, next){
    var newProduct = new Product(req.body);
    newProduct.id = res.locals.lastId + 1;
    newProduct.save(function(err, product){
      if(err) {
        res.status(500);
        res.json({success:false, message:err});
      }
      else {
        res.json({success:true, data:product});
      }
    });
  }
);

// Update Product
router.put('/:id',
  function(req, res, next){
    Product.findOneAndUpdate({id:req.params.id}, req.body)
    .exec(function(err, product){
      if(err) {
        res.status(500);
        res.json({success:false, message:err});
      }
      else if(!product){
        res.json({success:false, message:"Product not found"});
      }
      else {
        res.json({success:true});
      }
    });
  }
);

// Destroy Product
router.delete('/:id',
  function(req, res, next){
    Product.findOneAndRemove({id:req.params.id})
    .exec(function(err, product){
      if(err) {
        res.status(500);
        res.json({success:false, message:err});
      }
      else if(!product){
        res.json({success:false, message:"Product not found"});
      }
      else {
        res.json({success:true});
      }
    });
  }
);

module.exports = router;
