const express = require("express");
const cvCtrl = require("../controllers/cv");
const router = express.Router();

const isAuth = require("../middelware/is-auth");

// récupérer la liste de tous les Candidats
router.get("/candidats", cvCtrl.getAllcandidats);

// récupérer la liste de toutes les recrues
router.get("/recrues", cvCtrl.getAllrecrues);

//récupérer les infos sur un SEUL Candidat
router.get("/candidats/:id", cvCtrl.getCandidat);

//création d'un nouveau Candidat sans token
router.post("/candidats/free", cvCtrl.createCandidat);

//Update d'un Candidat sans token
router.put("/candidats/free/:id", cvCtrl.updateCandidat);

//suppression d'un Candidat sans token
router.delete("/candidats/free/:id", cvCtrl.deleteCandidat);

//création d'un nouveau Candidat
router.post("/candidats", isAuth, cvCtrl.createCandidat);

//Update d'un Candidat
router.put("/candidats/v2", cvCtrl.updateCandidat2);

//Update d'un Candidat
router.put("/candidats/:id", isAuth, cvCtrl.updateCandidat);

//Recruter ou non un Candidat
router.patch("/candidats/recruter/:id", cvCtrl.recruterCandidat);

//suppression d'un Candidat
router.delete("/candidats/:id", isAuth, cvCtrl.deleteCandidat);

module.exports = router;
