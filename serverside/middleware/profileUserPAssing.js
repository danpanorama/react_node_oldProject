const products = require("../models/db/mongoSal");
const alldata = require("../models/db/DBallStoreData");

const findUserItems = async (req, res, next) => {
  try {
    if (req.isStore == "false") {
      console.log("hayhay")

      let data2 = await products.find(
        {
          $and: [
            { ClientNumber: req.number },
            { clientName: req.name },
          ],
        },
        function (err, item) {
          if (err) throw err;
          req.profileProduct = item;
          console.log("datadata",item)
          next();
        }
      );
    } else {
    console.log("not a user")
      next();
    }
  } catch (e) {
    console.log(e, "cnnote get data from sal kniyot");
    res.json({err:e})
  }
};

module.exports.findUserItems = findUserItems;
