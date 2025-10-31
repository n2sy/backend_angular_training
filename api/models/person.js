const mongoose = require("mongoose");

const Schema = mongoose.Schema; // const { Schema } = mongoose;

/**
 * @swagger
 * components:
 *   schemas:
 *     Person:
 *       type: object
 *       required:
 *         - prenom
 *         - nom
 *       properties:
 *         _id:
 *           type: string
 *           description: ID auto-généré
 *           example : 507f1f77bcf86cd799439011
 *         prenom:
 *           type: string
 *           description: Prénom de l'utilisateur
 *           example : Nidhal
 *         nom:
 *           type: string
 *           description: Nom de l'utilisateur
 *           example : Jelassi
 *         age:
 *           type: number
 *           description: Age de l'utilisateur
 *           example : 38
 *         profession:
 *           type: string
 *           description: Profession de l'utilisateur
 *           example : formateur
 *         avatar:
 *           type: string
 *           description: Avatar de l'utilisateur
 *           example : http://avatar.com/avatar.png
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     PersonInput:
 *       type: object
 *       required:
 *         - prenom
 *         - nom
 *       properties:
 *         prenom:
 *           type: string
 *           description: Prénom de l'utilisateur
 *           example : Nidhal
 *         nom:
 *           type: string
 *           description: Nom de l'utilisateur
 *           example : Jelassi
 *         age:
 *           type: number
 *           description: Age de l'utilisateur
 *           example : 38
 *         profession:
 *           type: string
 *           description: Profession de l'utilisateur
 *           example : formateur
 *         avatar:
 *           type: string
 *           description: Avatar de l'utilisateur
 *           example : http://avatar.com/avatar.png
 */
const personSchema = new Schema(
  {
    prenom: {
      type: String,
      require: true,
    },
    nom: {
      type: String,
      require: true,
    },
    age: {
      type: Number,
    },
    profession: {
      type: String,
    },
    recrue: {
      type: Boolean,
    },
    avatar: {
      type: String,
      // data: Buffer,
      // contentType: String
    },
  },
  {
    versionKey: false, // You should be aware of the outcome after set to false
  }
);

module.exports = mongoose.model("Personne", personSchema);
