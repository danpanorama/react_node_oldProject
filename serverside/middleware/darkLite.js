const sqls = require("../models/sql/sqlpools")






module.exports = async (req, res, next) => {
  try {
            console.log(req.body)
            sqls.updateUserViwe(req.body.view ,req.body.number )
      next();
    
  } catch (e) {
    console.log(e);
  }
};
