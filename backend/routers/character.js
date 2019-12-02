const express = require("express");
const Characters = require("../models/Characters");
const auth = require("../middleware/auth");
const router = express.Router();

//get all by anything i want
router.post("/fav/getall", auth, async (req, res) => {
  let query = {};
  if (req.body.gender != "" && req.body.gender != undefined) {
    query["gender"] = req.body.gender;
  }
  if (req.body.status != "" && req.body.status != undefined) {
    query["status"] = req.body.status;
  }
  if (req.body.species != "" && req.body.species != undefined) {
    query["species"] = req.body.species;
  }
  if (req.body.name != "" && req.body.name != undefined) {
    query["name"] = { $regex: toTitleCase(req.body.name) };
  }

  let page = Number(req.body.page) ? Number(req.body.page) : 1;
  page -= 1;
  let perPage = Number(req.body.perPage) ? Number(req.body.perPage) : 10;
  query["user"] = req.user._id;
  var characters = await Characters.find(query)
    .sort({ id_char: 1 })
    .limit(perPage)
    .skip(perPage * page);
  var count = await Characters.countDocuments(query);
  res.send({
    results: characters,
    quantity: count,
    TotalPages: Math.ceil(count / perPage)
  });
});


//get all by anything i want
router.post("/fav/getallwp", auth, async (req, res) => {
  let query = {};
  query["user"] = req.user._id;
  var characters = await Characters.find(query)
    .sort({ id_char: 1 });
  var count = await Characters.countDocuments(query);
  res.send({
    results: characters,
    quantity: count
  });
});

const toTitleCase = phrase => {
  return phrase
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

//Remove one
router.post("/fav/del", auth, async (req, res) => {
  try {
    var ch = await Characters.find({
      user: req.user._id,
      id_char: req.body.id_char,
      image: req.body.image,
      name: req.body.name,
      gender: req.body.gender,
      status: req.body.status,
      species: req.body.species
    });
    await Characters.deleteOne({_id: ch[0]._id});
    res.send({ success: "true" });
  } catch (e) {
    console.log(e);
    res.send({ success: "false" });
  }
});

//Create one
router.post("/fav", auth, async (req, res) => {
  var Char = new Characters({
    user: req.user._id,
    id_char: req.body.id_char,
    image: req.body.image,
    name: req.body.name,
    gender: req.body.gender,
    status: req.body.status,
    species: req.body.species
  });
  Characters.find(
    {
      user: req.user._id,
      id_char: req.body.id_char,
      image: req.body.image,
      name: req.body.name,
      gender: req.body.gender,
      status: req.body.status,
      species: req.body.species
    },
    function(err, docs) {
      if (docs.length) {
        res.send({ Char: Char, success: "false" });
      } else {
        Char.save();
        res.send({ Char: Char, success: "true" });
      }
    }
  );
});


module.exports = router;
