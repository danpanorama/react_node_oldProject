const products = require("../models/db/DBallStoreData");

const findeProd = async (req, res, next) => {
  try {
    if (req.isStore == "false") {
   next();
    } else {
      console.log("its a Store",req.number)
         let data = await products.find(
        {
          $and: [
            { StoreName: req.name },
            { StoreNumber: req.number },
          ],
        },
        function (err, item) {
          if (err) throw err;
          req.profileProduct = item;
          next();
        }
      );
    }
  } catch (e) {
    console.log("error", e);
    res.json({err:e});
  }
};

module.exports.findeProd = findeProd;
