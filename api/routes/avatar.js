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

/**
 * @swagger
 * /images/upload/cloud:
 *   post:
 *     summary: Upload l'avatar d'un candidat sur Cloudinary
 *     tags: [Candidats]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - avatar
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Avatar uploadé avec succès
 *       400:
 *         description: Fichier manquant ou invalide
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Candidat non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.post("/cloud", handler);
module.exports = router;
