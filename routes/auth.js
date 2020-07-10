const express = require("express");
const router = new express.Router();

const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const uploader = require("./../config/cloudinary");

// form views


  // action::Registering

router.post("/signup", (req, res, next) => {
    console.log("dans le signup");
    console.log(req.body);
    
    const user = req.body; // req.body contains the submited informations (out of post request)
    // console.log(req.file);
    
    if (!user.email || !user.password) {
      req.flash("error", "no empty fields here please");
      return res.redirect("/signup");
      
    } else {
      UserModel
        .findOne({ email: user.email })
        .then(dbRes => {
          if (dbRes) { 
            req.flash("error", "sorry, email is already taken :/");
            return res.redirect("/signup");
          }
  
          const salt = bcrypt.genSaltSync(10); 
          const hashed = bcrypt.hashSync(user.password, salt);
          user.password = hashed;
      
  
          UserModel.create(user).then(() => res.redirect("/signin"));
        })
        .catch(next);
    }
  });
  
  // action::Login
  
  router.post("/signin", (req, res, next) => {
    const user = req.body;
  
    if (!user.email || !user.password) {
      // one or more field is missing
      req.flash("error", "wrong credentials");
      return res.redirect("/signin");
    }
  
    UserModel
      .findOne({ email: user.email })
      .then(dbRes => {
        if (!dbRes) {
          req.flash("error", "wrong credentials");
          return res.redirect("/signin");
        }
       
        if (bcrypt.compareSync(user.password, dbRes.password)) {
          const { _doc: clone } = { ...dbRes }; 
  
          delete clone.password; 
  
          req.session.currentUser = clone;
          return res.redirect("/"); //
          
        } else {
          req.flash("error", "wrong credentials");
          return res.redirect("/signin");
        }
      })
      .catch(next);
  });
  
  // action::Logout
  
  router.get("/signout", (req, res) => {
    req.session.destroy(() => {
      res.redirect("/signin");
    });
  });
  
  module.exports = router;
  