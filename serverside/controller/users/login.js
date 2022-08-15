const hapijoi = require("../../auth/joiLoggin");
const authbcrypt = require("../../auth/bcrypt");
const users = require("../../models/sql/sqlpools");
const jwt = require("../../auth/jwt");
const chakemiddleware = require("../../middleware/changePassTime")

const localStorage = require("localStorage");

// this is logg in function
const logedin = async (req, res, next) => {
  localStorage.setItem("isRemember", req.body.remember);

  if (req.body.name && req.body.password) {
    try {
      let data = await hapijoi.loginvalidation(req.body);
      let finduser = await users.cheakUserName(data.name);
      if (finduser[0].length > 0) {
        let checkpassword = await authbcrypt.checkPassword(
          req.body.password,
          finduser[0][0].password
        );
        let chekTokens = await jwt.makeToken({
          hash: finduser[0][0].password,
        }); 
        

        if (checkpassword && chekTokens) {
          console.log("don")

          res.json({userInfo:finduser[0][0],remember:req.body.remember,token:chekTokens,number:finduser[0][0].number,view:finduser[0][0].view})
          return;
        } else {
          res.json({err:"password or user name is incorrect"});
        }
      } else {
       res.json({err:"no such user or diractory"})
      }
    } catch (e) {
      console.log("i am the master ", e.message);
      // req.session.err = e.details.map((item) => item.message);
      res.json({err:e.message});
    }
  } else {
    res.json({err:"the value in this texts box is requier!"});
  }
};

const logute = async (req, res, next) => {
  try {
    if (req.session.loginName) {
      let promis = new Promise((ok, notok) => {
        req.session.loginName = undefined;
        req.session.clientNumber = undefined;
        req.session.store_idcart = undefined;
        req.session.idcart = undefined;
        req.session.itemData = undefined;
        req.session.jwtToken = undefined;
        req.session.userAllData = undefined;
        req.session.userStoreData = undefined;
        req.session.msg = "your logged out";
        req.session.err = "";
        ok("secsses");
        notok(new Error("fail"));
      });
      promis.then((val) => {
        console.log("loggd uot " + val);
      });

      res.redirect("/");
    } else {
      req.session.err = "your need to loggd in first";
      res.redirect("/login");
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports.logedin = logedin;
module.exports.logute = logute;
