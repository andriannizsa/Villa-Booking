const multer = require("multer");

const userStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images/avatar");
    },
    filename: (req, file, cb) => {
      cb(null, new Date().getTime() + "-" + file.originalname);
    },
  });

const villaStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
})

  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  const uploads = multer({ storage: userStorage, fileFilter: fileFilter });
  const upload = multer({storage: villaStorage, fileFilter:fileFilter })

  module.exports = {uploads, upload};