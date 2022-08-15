var express = require("express");
const updateUser = require("../controller/users/updateUser");
const updateStore = require("../controller/store/updateStoreInfo");
const tokenandName = require("../middleware/tokenMiddleware");

var router = express.Router();

/* GET home page. */
router.get(
  "/",
 
  function (req, res) {
    res.render("updateUserPage", {
      title: "Express",
      ...req.infoNav,
      err: req.session.err,
      token:req.session.jwtToken,
      storePass: req.session.idcart,
      userAllData: req.session.userAllData,
      userStoreData: req.session.userStoreData,
      loginName: req.session.loginName,
      view: req.session.view,
      userNumber: req.session.clientNumber,
    });
  }  
);

router.post("/updateUser", updateUser.update, function (req, res) {
  console.log("update");
  res.json({ok:"updated",token: req.tokeKey,userInfo:req.userAllData});
});

router.post("/updateStore", updateStore.update, function (req, res) {
  res.json({ok:"updated",token:req.tokenKey,userInfo:req.userStoreData});
});

module.exports = router;
