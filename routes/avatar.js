const express = require("express");
var multer = require("multer");
const avatarCtrl = require("../controllers/avatar");
const { default: handler } = require("../controllers/uploads");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
};

const upload = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Le format de l'image est invalide");
    if (isValid) {
      cb(null, "./uploads");
    } else {
      cb(error, null);
    }
  },
  filename: (req, file, cb) => {
    const name =
      file.originalname.toLowerCase().split(".")[0] + "-" + Date.now();
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "." + ext);
  },
});

const router = express.Router();
router.post(
  "",
  multer({ storage: upload, limits: { fileSize: 1 * 1024 * 1024 } }).single(
    "avatar"
  ),
  avatarCtrl.postAvatar
);

router.post("/cloud", handler);
module.exports = router;
