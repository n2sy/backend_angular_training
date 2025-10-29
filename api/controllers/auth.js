const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  bcrypt
    .hash(password, 12)
    .then((hashedPwd) => {
      const user = new User({
        email: email,
        password: hashedPwd,
      });
      return user.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "Utilisateur créé avec succès",
        userId: result["_id"],
        user: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((u) => {
      if (!u) {
        const error = new Error("Aucun utilisateur avec cet email n'existe");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = u;
      return bcrypt.compare(password, loadedUser.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Mot de passe erroné");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
        },
        "supersecretcode",
        { expiresIn: "12h" }
      );
      res.status(200).json({
        message: "Utilisateur authentifié",
        token: token,
      });
    })
    .catch((err) => {
      console.log(err);
      next();
    });
};
