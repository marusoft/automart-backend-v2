const multer = require("multer");

const path = require("path");

// dest or storage	Where to store the files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/data/my-uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

// fileFilter	Function to control which files are accepted
const fileFilter = (req, file, cb) => {
  let extension = path.extname(file.originalname);
  if (extension !== ".jpg" && extension !== ".jpeg" && extension !== ".png") {
    cb(new Error("File type is not supported"), false);
    return;
  }
  cb(null, true);
};

// limits:	Limits of the uploaded data

// Multer config
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 },
  fileFilter: fileFilter,
});

module.exports = upload;
