const hapijoi = require("../../auth/CosAohtak");
const authbcrypt = require("../../auth/bcrypt");
const users = require("../../models/sql/sqlpools");
const mongoos = require("../../models/db/mongoSal");
const storeSal = require("../../models/db/StoreSal");
const allDb = require("./../../models/db/DBallStoreData")
const jwtPass = require("../../auth/chackPass180");
const jwt = require("../../auth/jwt");
const localStorage = require("localStorage");


const update = async (req, res, next) => {

  try {
    let data = await hapijoi.cosAohtak(req.body);
    let usersarray = await users.selectUser();

    let filterUsers = await usersarray.filter((user) => {
      return user.number != req.body.number;
    });

    let validName = await filterUsers[0].filter((user) => {
     return user.name == req.body.name;
    });

    let validEmail= await filterUsers[0].filter((user) => {
     return user.email == req.body.email;
    });
    console.log(validName,":::")

    if (validName.length > 0) {
      res.json({err:"user name alredy exist"});
      return
    }
    if (validEmail.length > 0) {
      res.json({err:"user email alredy exist"});
      return
    }

    let makenewhash = await authbcrypt.hashPassport(data.password);
    data.password = makenewhash;

    let newToken = await jwtPass.makeToken({hash:data.password});
    req.tokeKey = newToken;

    let updatcomp = await users.updateUser(
      data.password,
      
      data.name,
      data.email,
      data.phon,
      data.view,
      data.number
    );

    let dbupdate = await mongoos
      .updateMany(
        { clientName: req.body.firstName },
        { $set: { clientName: data.name } },
        function (err, user) {
          if (err) throw err;
        console.log("don")
        }
      )
      .catch((err) => console.log(err));


      let dbupdate2 = await storeSal 
      .updateMany(
        {  StoreNumber: req.body.number  },
        { $set:{ StoreName: data.name } },
        function (err, user) {
          if (err) throw err;
         console.log("don gegabana") 
        }
      )
      .catch((err) => console.log(err));


       let dbupdate4 = await allDb 
      .updateMany(
        {'userUnlike.number':req.body.number},
        { $set:{ 'userUnlike.$.name': data.name } },
        function (err, user) {
          if (err) throw err;

        }
      )
      .catch((err) => console.log(err));




      req.userAllData = data;
      res.status(201);
      next();

  } catch (e) {
    console.log("error while updating user");
    res.status(500);
    console.log(e);
    res.json({err:"error while create user"});
  }
};

module.exports.update = update;
