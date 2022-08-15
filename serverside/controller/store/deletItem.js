const deleteall = require("../../models/db/DBallStoreData");
const sal = require("../../models/db/mongoSal");

const deleteItems = async (req, res, next) => {
  if (req.body.isStore.isStore) {
    try {
      // let data =
      await deleteall.deleteOne(
        { _id: req.params.itemID, StoreName: req.body.isStore.userInfo.name },
        function (err, item) {
          if (err) throw err;
          console.log("deletes")
          next();
        }
      );
    } catch {
      console.log("dident deleted item");
      res.json({err:"errrererer"});
    }
  } else {
    console.log("pass");
  
    next();
  }
};

const deleteItemssal = async (req, res, next) => {
  try {
    let data2 = await sal.deleteOne({ _id: req.params.itemID },
       function (
      err,
      item
    ) {
      if (err) throw err;
      console.log("deletesdsdsdsdss")
      next();
    });
  } catch {
    console.log("dident deleted item");
    res.json({err:"donot deleter"});
  }
};

module.exports.deleteItems = deleteItems;
module.exports.deleteItemssal = deleteItemssal;
