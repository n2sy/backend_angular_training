const express = require("express");
const cvCtrl = require("../controllers/cv");
const router = express.Router();

const isAuth = require("../middelware/is-auth");

// récupérer la liste de tous les Candidats
/**
 * @swagger
 * /cv/candidats:
 *   get:
 *     summary: Récupère tous les candidats
 *     tags: [Candidats]
 *     responses:
 *       200:
 *         description: Liste des candidats
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Person'
 *       500:
 *         description : Erreur interne du serveur
 */
router.get("/candidats", cvCtrl.getAllcandidats);

// récupérer la liste de toutes les recrues
router.get("/recrues", cvCtrl.getAllrecrues);

//récupérer les infos sur un SEUL Candidat
/**
 * @swagger
 * /cv/candidats/{id}:
 *   get:
 *     summary: Récupère un candidat par ID
 *     tags: [Candidats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Détails du candidat
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Person'
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description : Erreur interne du serveur
 */
router.get("/candidats/:id", cvCtrl.getCandidat);

//création d'un nouveau Candidat sans token
/**
 * @swagger
 * /cv/candidats/free:
 *   post:
 *     summary: Crée un nouveau candidat
 *     tags: [Candidats]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PersonInput'
 *     responses:
 *       201:
 *         description: Candidat créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Person'
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Vous devez vous authentifier
 *       500:
 *         description : Erreur interne du serveur
 */
router.post("/candidats/free", cvCtrl.createCandidat);

//Update d'un Candidat sans token
/**
 * @swagger
 * /cv/candidats/free/{id}:
 *   put:
 *     summary: Met à jour les infos d'un candidat
 *     tags: [Candidats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PersonInput'
 *     responses:
 *       201:
 *         description: Candidat mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Person'
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description : Erreur interne du serveur
 */
router.put("/candidats/free/:id", cvCtrl.updateCandidat);

//suppression d'un Candidat sans token
/**
 * @swagger
 * /cv/candidats/free/{id}:
 *   delete:
 *     summary: Supprime un candidat
 *     tags: [Candidats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     responses:
 *       201:
 *         description: Candidat supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Person'
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description : Erreur interne du serveur
 */
router.delete("/candidats/free/:id", cvCtrl.deleteCandidat);

//création d'un nouveau Candidat
/**
 * @swagger
 * /cv/candidats:
 *   post:
 *     summary: Crée un nouveau candidat (avec token)
 *     tags: [Candidats]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PersonInput'
 *     responses:
 *       201:
 *         description: Candidat créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Person'
 *       401:
 *         description: Token manquant ou invalide
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token non fourni"
 *       403:
 *         description: Token expiré
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token expiré"
 *       500:
 *         description : Erreur interne du serveur
 */
router.post("/candidats", isAuth, cvCtrl.createCandidat);

//Update d'un Candidat
router.put("/candidats/v2", cvCtrl.updateCandidat2);

//Update d'un Candidat
/**
 * @swagger
 * /cv/candidats/{id}:
 *   put:
 *     summary: Met à jour les infos d'un candidat (avec token)
 *     tags: [Candidats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PersonInput'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Candidat mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Person'
 *       401:
 *         description: Token manquant ou invalide
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token non fourni"
 *       403:
 *         description: Token expiré
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token expiré"
 *       500:
 *         description : Erreur interne du serveur
 */
router.put("/candidats/:id", isAuth, cvCtrl.updateCandidat);

//Recruter ou non un Candidat
router.patch("/candidats/recruter/:id", cvCtrl.recruterCandidat);

//suppression d'un Candidat
/**
 * @swagger
 * /cv/candidats/{id}:
 *   delete:
 *     summary: Supprime un candidat (avec token)
 *     tags: [Candidats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Candidat supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Person'
 *       401:
 *         description: Token manquant ou invalide
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token non fourni"
 *       403:
 *         description: Token expiré
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token expiré"
 *       500:
 *         description : Erreur interne du serveur
 */
router.delete("/candidats/:id", isAuth, cvCtrl.deleteCandidat);

module.exports = router;
