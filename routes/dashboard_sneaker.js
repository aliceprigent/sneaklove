const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const SneakerModel = require("../models/Sneaker");
const uploader = require("./../config/cloudinary");
const TagModel = require("../models/Tag");

router.get("/prod-manage", (req, res) => {
  SneakerModel.find()
    .then((dbRes) => res.render("products_manage", { sneakers: dbRes }))
    .catch((err) => console.error(err));
});

router.get("/prod-add", (req, res) => {
  res.render("products_add");
});

router.post("/prod-add", uploader.single("picture"), (req, res, next) => {
  const { name, ref, size, description, price, category, id_tags } = req.body;
  SneakerModel.create({
    name,
    ref,
    picture: req.file ? req.file.path : undefined,
    size,
    description,
    price,
    category,
    id_tags,
  })
    .then(() => res.redirect("/prod-manage"))
    .catch(next);
});

router.post("/tag-add", (req, res, next) => {
  TagModel.create(req.body)
    .then((dbRes) => res.json(dbRes))
    .catch((dbErr) => next(dbErr));
});


router.get("/prod-delete/:id", async (req, res, next) => {
  try {
    await SneakerModel.findByIdAndRemove(req.params.id);
    res.redirect("/prod-manage");
  } catch (err) {
    next(err);
  }
});

router.get("/prod-edit/:id", (req, res, next) => {
  SneakerModel.findById(req.params.id)
    .then((sneaker) => {
      res.render("product_edit", { sneaker });
    })
    .catch(next);
});

router.post("/prod-edit/:id", (req, res, next) => {
  SneakerModel.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      req.flash("success", "sneaker successfully updated");
      res.redirect("/prod-manage");
    })
    .catch(next);
});

module.exports = router;
