const SetMyItem = require("../../models/db/mongoSal");

const fs = require("fs");
const path = require("path");

const setitemintosal = async (req, res, next) => { 
  try {
    console.log(req.dicvar.imgname,"ghfhjgjgfhjgfhj")
    const setItem = await new SetMyItem({
      ID: req.params.itemID,
      itemName: req.dicvar.itemName, 
      itemDiscription: req.dicvar.itemDiscription,
      itemPrice: req.dicvar.itemPrice,
      itemTopic: req.dicvar.itemTopic,
      idcart: req.dicvar.idcart,
      StoreName: req.dicvar.StoreName,
      clientName: req.body.name,
      ClientNumber: req.body.number,
      imgname:req.dicvar.imgname,
      sum: req.body.sum,
      file: req.dicvar.file,
    });
    setItem
      .save()
      .then((result) => {
       req.result=result
        next();
      })
      .catch((err) => console.log(err));
  } catch (e) {
    console.log("error while edit item", e);
    res.json({err:"error while edit item"});
  }
};

module.exports.setitemintosal = setitemintosal;
