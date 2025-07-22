import multer from "multer";
import fs from "fs";
import path from "path";

const dir = "../upload";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
export const upload = multer({
  storage: storage,
});

function checkFileType(file, cb) {
  const filetype = /png|jpg\jpeg/;
  const extname = filetype.test(
    path.extname(file.originalname).toLocaleLowerCase()
  );
  const mimetype = filetype.test(file.mimetype);
  if (mimetype && extname) {
    return cb(file, true);
  } else {
    console.log(error);
  }
}
