const SetItem = require("../../models/db/mongoSal");
const SetAllItem = require("../../models/db/DBallStoreData");

const joiifValid = require("../../auth/hapi");
const path = require("path");
const fs = require("fs");
const { cache } = require("ejs");

// פה אני מכניס את המידע שקיבלתי לתוך התא של העסק העצמי ולתוך התא של כל המוצרים

const setItemMiddleware = async (req, res, next) => {
  var set;
  try {
    // let data = await joiifValid.createProductSchema(req.body.values);
    if (req.file) {
      set = {
        itemName: req.body.values.itemName,
        itemDiscription: req.body.values.itemDiscript,
        itemPrice: req.body.values.itemPrice,
        itemTopic: req.body.values.itemTopic,
        idcart: req.session.idcart,
        StoreName: req.session.loginName,
        StoreNumber: req.session.clientNumber,
        file: {
          data: fs.readFileSync(
            path.join(
              __dirname +
                "../" +
                "../" +
                "../" +
                "public" +
                "/uploads/" +
                req.file.filename
            )
          ),
          contentType: "image/png",
        },
      };
    } else {
      set = {
        itemName: req.body.values.itemName,
        itemDiscription: req.body.values.itemDiscription,
        itemPrice: req.body.values.itemPrice,
        itemTopic: req.body.values.itemTopic,
        idcart: req.body.values.idcart,
        StoreName: req.body.values.StoreName,
        StoreNumber: req.body.values.StoreNumber,
        imgname:req.body.values.imgname
      };
    }

    if (req.body.values.itemPrice) {
      const setAlllItem = await new SetAllItem(set);
      setAlllItem
        .save()
        .then(async (result) => {
          console.log("::::::::::",result)
          
          const setItem = await new SetItem(set);
          setItem
            .save()
            .then((result2) => {
              console.log(result)
              res.json({ok:"ok",id:result._id,salID:result2._id}).status(201);
            })
            .catch((err) => res.status(404));
        })
        .catch((err) => res.status(500));
    } else {
     
      res.json({err:"err"}).status(500);
    }
  } catch (e) {
    console.log("error while edit item setStoreItems", e);
    res.json({err:"error while edit item setStoreItems", e});
  }
};

module.exports.setItemMiddleware = setItemMiddleware;
