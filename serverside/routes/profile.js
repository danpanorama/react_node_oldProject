var express = require("express");
const updateUser = require("../controller/users/updateUser");
const updateStore = require("../controller/store/updateStoreInfo");
const tokenPass = require("../middleware/changePassTime")
const tokenandName = require("../middleware/tokenMiddleware");
const darkLite = require("../middleware/darkLite");

const finderProducts = require("../middleware/profileStorePassing");
const findeUserItems = require("../middleware/profileUserPAssing");


var router = express.Router();

/* GET home page. */
router.get(
  "/",
  tokenandName.tryGetIn,
  finderProducts.findeProd,
  findeUserItems.findUserItems,
  function (req, res) {
    res.json({ 
      token:req.token,
      items: req.profileProduct,
    });
  }
);


router.post("/tokencheck", tokenandName.tryGetIn, function (req, res, next) {
  res.json({pass:"ok"});
});


router.post("/darklite", darkLite, function (req, res, next) {
  console.log("darklite")
    res.json({don:"okk"});
});


module.exports = router;
