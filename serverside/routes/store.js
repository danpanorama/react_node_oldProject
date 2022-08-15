var express = require("express");
const setStoreItems = require("../controller/store/setStoreItem");
const deleteItems = require("../controller/store/deletItem");
const tokenMiddleware = require("../middleware/tokenMiddleware");
const sal = require("../controller/users/aditItem");
const setSal = require("../controller/store/setSalItem");
const getItemDB = require("../controller/store/getStoreItem");
const findProductinBass = require("../controller/store/getItemByID");
const updateItem = require("../controller/store/updateItem");
const updateSalItem = require("../controller/store/updateSalItem");
const getStoreArray = require("../middleware/getStoreArray")
const getLength = require("../controller/store/getLengthData")

var multer = require("multer");
const path = require("path");

const multerconfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "public", "uploads"));
  },
  filename: function (req, file, cb) {
    const onemarr = file.originalname.split("/");
    const fileend = onemarr[onemarr.length - 1];
    cb(null, fileend);
  },
});
const upload = multer({ storage: multerconfig });

var router = express.Router();

/* GET store page. */

router.get("/",
getStoreArray.getStoreArray, 
 getItemDB.getItem, async function (req, res) {
  res.json( {
    data: req.itemData,
    allData:req.storeLength,
  });
});

// adit item
router.post(
  "/edit/:itemID",
  tokenMiddleware.tryGetIn,
  findProductinBass.findItemThatAdd,
  setSal.setitemintosal,
  (req, res) => {
    console.log(req.profileProduct)
res.json({data:req.result})
  }
);
 
// set store item

router.post(
  "/setitems",
  upload.single("file"),
  setStoreItems.setItemMiddleware,
  (req, res) => {}
);

// delete store item

router.post(
  "/delete/:itemID",
  deleteItems.deleteItems,
  deleteItems.deleteItemssal,
  (req, res) => {
    res.json({ok:"deleted"});
  }
);


// get items length
router.get(
  "/getlength",
 getLength.getLength,
  (req, res) => {
    res.json({data:req.itemLength})
  }
);


// updating item

router.post(
  "/update",
  upload.single("file"),
  tokenMiddleware.tryGetIn,
  updateItem.updatingItem,
  updateSalItem.updatingItem,
  (req, res) => {
    console.log("finish update");
    res.json({ok:"update Secsses"});
  }
);

// get item parms page

router.get("/:productid", sal.setItemSal, (req, res) => {

  res.render("itemSelect", {
    ...req.infoNav,
    data: req.item,
    itemInfo: req.itemInfo,
    view: req.session.view,
    mssg:req.session.mssg, 
    summ:req.query.sum,
    loginName: req.session.loginName,
    clientNumber: req.session.clientNumber, 
  });
  req.session.mssg = undefined;


});

module.exports = router;
