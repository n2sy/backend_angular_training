import { v2 as cloudinary } from "cloudinary";
import formidable from "formidable";
import * as dotenv from "dotenv";
import fs from "fs/promises";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  try {
    const form = formidable({ multiples: false });
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });
    const file = files.avatar?.[0];
    if (!file) {
      return res.status(400).json({ message: "Aucun fichier reçu" });
    }
    const result = await cloudinary.uploader.upload(file.filepath, {
      folder: "avatars",
    });
    await fs.unlink(file.filepath);
    return res.status(200).json({
      message: "Upload réussi ✅",
      url: result.secure_url,
    });
  } catch (error) {
    console.error("Erreur upload :", error);
    return res.status(500).json({
      message: "Erreur lors de l’upload",
      error: error.message || error,
    });
  }
}
