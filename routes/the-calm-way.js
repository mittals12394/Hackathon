const express = require('express');
const mongodb = require('mongodb');

const bcrypt = require("bcryptjs");

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

router.get("/post-page", function(req,res){
  res.render("post-page");
});

router.get("/membership", function(req,res){
    res.render("membership");
});

router.get("/payment", function(req, res){
    res.render("payment");
});

router.get("/signup", function(req, res){
    res.render("signup");
});

router.post("/signup", async function(req, res){
    const userData = req.body;
    const enteredName = userData.name;
    const enteredEmail = userData.email;
    const enteredPassword = userData.password;
    const enteredConfirmPassword = userData["confirm-password"];

    if (!enteredEmail ||
        !enteredConfirmPassword || 
        !enteredPassword ||  
        enteredPassword !== enteredConfirmPassword || 
        !enteredEmail.includes("@")) {
  
      console.log("Incorrect Data");
      res.redirect("/signup");
    }

    const existingUser = await db.getDb().collection("users").findOne({email: enteredEmail});

    if(existingUser){
    console.log("user already exists!");
    return res.redirect("/login");
  }

  const hashedPassword = await bcrypt.hash(enteredPassword, 12);

  const user = {
    name: enteredName,
    email: enteredEmail,
    password: hashedPassword
  };

  await db.getDb().collection("users").insertOne(user);

  res.redirect("/");

});

router.get("/login", function(req,res){
    res.render("login");
});

router.post("/login", async function(req,res){
    const userData = req.body;

    const enteredEmail = userData.email;
    const enteredPassword = userData.password;

    const existingUser = await db.getDb().collection("users").findOne({ email: enteredEmail });

    if (!existingUser) {
    console.log("Could not log in");
    return res.redirect("/login");
  }

  const passwordsAreEqual = await bcrypt.compare(enteredPassword, existingUser.password);

  if (!passwordsAreEqual) {
    console.log("Passwords are not equal");
    return res.redirect("/login");
  }

  console.log("User successfully logged in");
  res.redirect("/");
});

router.get("/consult", function(req,res){
  res.render("consult");
});

router.get("/doctors", function(req,res){
  res.render("doctors");
});

module.exports = router;