const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});

const upload = multer({
  storage: storage,
  // fileFilter:function (req, file, cb) {
  //     if (file.mimetype == "image/png"||file.mimetype == "image/jpg") {
  //         cb(null,true)

  //     }else{
  //         console.log('only png & jpg file support');
  //         cb(null,false)
  //     }
  // },
  limits: { fileSize: 5000000 },
});
module.exports = upload;
