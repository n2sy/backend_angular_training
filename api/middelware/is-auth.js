const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (
    !authHeader ||
    authHeader.includes("null") ||
    authHeader.includes("undefined")
  ) {
    const error = new Error("Veuillez vous authentifier...");
    error.statusCode = 401;
    next(error);
  } else {
    const token = authHeader.split(" ")[1];

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, "supersecretcode"); // decode and verify
      if (!decodedToken) {
        const error = new Error("Votre token est invalide ou a expiré");
        error.statusCode = 401;
        throw error;
      }
      next();
    } catch (err) {
      next(err);
    }
  }
};
