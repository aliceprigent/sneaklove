const express = require("express");
const router = express.Router();
const TagModel = require("../models/Tag");
const SneakerModel = require("../models/Sneaker");
const UserModel = require("../models/User");
console.log(`\n\n
-----------------------------
-----------------------------
     wax on / wax off !
-----------------------------
-----------------------------\n\n`);

router.get("/", (req, res) => {
  res.render("index.hbs");
});

// router.get("/sneakers/collection", (req, res, next) => {
//   SneakerModel.find()
//     .then((dbResults) => {
//       console.log(dbResults);
//       res.render("products", { dbResults });
//     })
//     .catch(next);
// });

router.get("/sneakers/:cat", (req, res, next) => {
  let myQuery = {};
  if (req.params.cat != "collection") myQuery = { category: req.params.cat };
  SneakerModel.find(myQuery)
    .then((dbResults) => {
      console.log(dbResults);
      res.render("products", { sneakers: dbResults });
    })
    .catch(next);
});

router.get("/one-product/:id", (req, res) => {
  res.render("one_product");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

module.exports = router;
