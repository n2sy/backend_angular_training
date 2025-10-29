const express = require("express");
const mongoose = require("mongoose");
const cvRoutes = require("./routes/cv");
const authRoutes = require("./routes/auth");
const avatarRoutes = require("./routes/avatar");
var cors = require("cors");
var fs = require("fs");

require("dotenv").config();
const app = express();

app.use(express.json()); //application/json

app.use(cors());

const connectToDatabase = async () => {
  console.log("zzzzz", mongoose.connection.readyState);

  if (mongoose.connection.readyState >= 1) {
    // Déjà connecté (1 = connected, 2 = connecting)
    return;
  }

  const uri = `mongodb+srv://${process.env.pseudo}:${process.env.pwd}@${process.env.projectname}.cpsst.mongodb.net/${process.env.dbname}?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
};

// Middleware pour s’assurer que la DB est connectée avant de traiter les routes
app.use(async (req, res, next) => {
  await connectToDatabase();
  console.log("Server started");
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "API en ligne sur Vercel 🚀" });
});

app.use("/avatars", express.static("public"));
app.use("/images/upload", avatarRoutes);

app.use("/auth", authRoutes);
app.use("/cv", cvRoutes);

app.use((error, req, res, next) => {
  if (error.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      message: "Le fichier est trop volumineux. Taille maximale : 1 Mo.",
    });
  }
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data }); //data c'est pour la validation
});

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Serveur local démarré sur le port ${PORT}`);
  });
}

module.exports = app;
