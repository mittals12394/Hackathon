const express = require('express');
const mongodb = require('mongodb');

const db = require('../data/database');

const ObjectId = mongodb.ObjectId;

const router = express.Router();

router.get("/", function(req,res){
    res.render("index");
});

router.get("/volunteer", function(req,res){
    res.render("volunteer");
});

router.get("/stories", function(req,res){
    res.render("stories");
});

router.get("/membership", function(req,res){
    res.render("membership");
});

router.get("/payment", function(req, res){
    res.render("payment");
});

module.exports = router;