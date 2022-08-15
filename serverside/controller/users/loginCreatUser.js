const hapijoiCreate = require("../../auth/joiCreat");
const authbcrypt = require("../../auth/bcrypt");
const users = require("../../models/sql/sqlpools");
const jwt = require("../../auth/jwt");
const localStorage = require("localStorage");
const jwtPass = require("../../auth/chackPass180")

// this is create use rfunction

const createNewAccount = async (req, res, next) => {
try {
  
  const date = new Date();
  localStorage.setItem("isRemember", req.body.remember);
  let CheckingUserName = await users.cheakUserName(req.body.name);
  if (CheckingUserName[0].length > 0) {
  return res.json({err:"user username is alredy in used"});
  
  }
  let checkingUserEmail = await users.cheakUserEmail(req.body.email);
  if (checkingUserEmail[0].length > 0) {
  return res.json({err:"user email is alredy in used"});
  
  }

  let data = await hapijoiCreate.createAccount(req.body);
  let hash = await authbcrypt.hashPassport(data.password);
  let token = await jwt.makeToken({ hash: hash });
  let passChange = await jwtPass.makeToken({ hash: hash })
  let insertToBigBase = await users.insertNewStore(
    data.name,
    hash,
    data.email,
    data.phon,
    data.view,
    date,
    data.isStore
  );

  if (insertToBigBase) {
    let user = await users.cheakUserName(data.name)
    res.json({number:user[0][0].number,userInfo:user[0][0],token:token,view:data.view,tokenTime:passChange,remember:req.body.remember});
  }

} catch (e) {
  console.log("::::",e)
  res.json({err:"error unvalid prop" +e, e,error:e}).status(500);
}
};

module.exports.createNewAccount = createNewAccount;
