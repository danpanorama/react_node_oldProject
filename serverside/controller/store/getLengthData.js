const GetAllItem = require("../../models/db/DBallStoreData");

// פה אני מנסה לקבל את מספר המקומות במערך כדי לעשות פאגינאטיאון
const getLength = async (req, res, next) => {
    try {
      // let data =
      await GetAllItem.find({}, function (err, user) {
        if (err) throw err;
        req.itemLength = user.length;
        res.status(202);
        next();
      }).catch((err) => console.log(err));
    } catch {
      console.log("error by get data");
      res.status(500);
    }
  
};

module.exports.getLength = getLength;
