const path = require("path");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, callback) {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callback(null, uniquePrefix + "-" + file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

module.exports = multer({
  storage,
  fileFilter,
  limits: {
    filesize: 1024 * 1024 * 5, // 1024 bytes * 1024 * kb * 5 mb
  },
});
