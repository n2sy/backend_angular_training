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

app.use("/avatars", express.static("uploads"));
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

mongoose
  .connect(
    `mongodb+srv://${process.env.username}:${process.env.password}@${process.env.projectname}.cpsst.mongodb.net/${process.env.dbname}?retryWrites=true&w=majority`
    // `mongodb+srv://${process.env.username}:${process.env.password}rty@cvproject.cpsst.mongodb.net/${process.env.bdname}`
  )
  .then(
    app.listen(
      Number(process.env.PORT) || 3000,
      console.log("Server started !")
    )
  )
  .catch((err) => console.log(err));
