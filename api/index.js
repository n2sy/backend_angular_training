const express = require("express");
const mongoose = require("mongoose");
const cvRoutes = require("./routes/cv");
const authRoutes = require("./routes/auth");
const avatarRoutes = require("./routes/avatar");
const cors = require("cors");
const { swaggerUi, specs } = require("./swagger");
require("dotenv").config();

const app = express();

// Middleware de base
app.use(express.json());
app.use(cors());

// Cache de connexion MongoDB
let isConnected = false;

const connectToDatabase = async () => {
  // Si déjà connecté, pas besoin de reconnecter
  if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }

  const uri = `mongodb+srv://${process.env.pseudo}:${process.env.pwd}@${process.env.projectname}.cpsst.mongodb.net/${process.env.dbname}?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    isConnected = true;
    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    isConnected = false;
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
};

// Middleware pour connecter à la DB avant chaque requête
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    res.status(500).json({
      message: "Erreur de connexion à la base de données",
      error: error.message,
    });
  }
});

// Route de test
app.get("/", (req, res) => {
  res.json({
    message: "API en ligne sur Vercel 🚀",
    dbConnected: mongoose.connection.readyState === 1,
  });
});

// Routes statiques et API
app.use("/api", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/avatars", express.static("public"));
app.use("/images/upload", avatarRoutes);
app.use("/auth", authRoutes);
app.use("/cv", cvRoutes);

// Gestion des erreurs
app.use((error, req, res, next) => {
  if (error.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      message: "Le fichier est trop volumineux. Taille maximale : 1 Mo.",
    });
  }

  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({ message: message, data: data });
});

// Pour développement local uniquement
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Serveur local démarré sur le port ${PORT}`);
  });
}

// EXPORT POUR VERCEL (obligatoire)
module.exports = app;
