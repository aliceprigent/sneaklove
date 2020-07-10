const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const SneakerModel = require("../models/Sneaker");
const uploader = require("./../config/cloudinary");

router.get("/prod-manage", (req, res) => {
    res.render("products_manage")
});

router.get("/prod-add", (req, res) => {
    res.render("products_add")
});

router.post("/prod-add", uploader.single("picture"), (req, res) => {
    SneakerModel.create(req.body)
    console.log(req.body)
    .then((dbRest) => res.redirect("/prod-manage"))
    .catch((dbErr) => res.send("Error"));
});

router.get("/prod-delete/:id", async (req, res, next) => {
    try {
      await SneakerModel.findByIdAndRemove(req.params.id);
      res.redirect("/prod-manage")
    } catch(err) {
      next(err);
    }
  });

router.get("/prod-edit/:id", (req, res, next) => {
    SneakerModel
    .findById(req.params.id) 
    .then(label => {
      res.render("/prod-manage", {
        label
      });
    })
    .catch(next); 
});

router.post("/prod-update/:id", async (req, res) => {
    try {
      await SneakerModel.findByIdAndUpdate(req.params.id, req.body);
      res.redirect("/prod-manage");
    } catch(err) {
      next(err);
    }
  });

module.exports = router;
