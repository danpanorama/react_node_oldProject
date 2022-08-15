const jwt = require("../auth/jwt");

const tryGetIn = async (req, res, next) => {
  
    try {
      console.log(req.body,req.query)
      
      var tokenKey=""
   
        if(req.body.token){
          tokenKey = req.body.token
          }
        else  if(req.query.token){
            tokenKey = req.query.token
          } 
        else{
            console.log("errrorrr token error")
            res.json({err:"no no no",notoken:"no topken"})
          }

          console.log("::::::::",req.query)
          req.isStore= req.query.isStore
          req.name = req.query.name;
          req.number = req.query.number;
   req.token = await jwt.chekingToken(tokenKey);
   next();
  
    } catch (e) {
      console.log(e);
      req.session.loginName = undefined;
      req.session.userAllData = undefined;
      res.json({err:"no token to pass",notoken:e})
  } 
};

module.exports.tryGetIn = tryGetIn;
