const hapijoi = require("../../auth/joiCreat");
const authbcrypt = require("../../auth/bcrypt");
const users = require("../../models/sql/sqlpools");
const mongoos = require("../../models/db/DBallStoreData");
const jwt = require("../../auth/jwt");
const localStorage = require("localStorage");

const update = async (req, res, next) => {
  try {
    if(req.body.password){
     console.log(req.body,"::::::",req.body.firstName) 
    
    let data = req.body;
    let usersarray = await users.selectUser();

    let filterUsers = await usersarray.filter((user) => {
      return user.number != req.body.number;
    });
    console.log(filterUsers)
    

    let validName = await filterUsers.filter((user) => {
      user.name = req.body.name;
    });
    if (validName.length > 0) {
      console.log("user name alredy exist");
    return  res.json({err:"user name alredy exist try other name"}).status(201);
    }


    // let chackName = await users.cheakStoreName(req.body.name);
    // if (chackName[0].length > 0) {
    //  return res.json({err:"store name is alredy in used"}).status(500);
    // }
    
    let makenewhash = await authbcrypt.hashPassport(data.password);
    let tokenKey = await jwt.makeToken({hash:data.password})
    req.tokenKey = tokenKey;

    data.password = makenewhash;

    let updatcomp = await users.updateStore(
       data.password,
       data.name, 
       data.email,
       data.phon,
      data.view,
      data.number
    );
    let dbupdate = await mongoos
      .updateMany(
        { StoreName: req.body.firstName },
        {
          $set: {
            StoreName: data.name,
            StoreNumber: data.number,
          },
        },
        function (err, user) {
          if (err) throw err;
          data.isStore = 1;
          req.userStoreData = data;
         
          console.log(req.userStoreData,";;;;;;;");
          
          next()
        }
      )
      .catch((err) => console.log(err));
      

    }else{
      return res.json({err:"you must fild the password"})
    }
  } catch (e) {
    console.log("error while updating user");
    res.json({err:"error while update store"}).status(500);
    console.log(e);
  }
};

module.exports.update = update;
