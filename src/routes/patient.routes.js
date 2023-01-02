const router = require("express").Router();
const {
  createPatient,
  getPatient,
  getPatientById,
  updatePatient,
  deletePatientById,
} = require("../controllers/patient.controllers");
const { verifyToken, isAdmin } = require("../middlewares/authJwt");
const { checkDuplicateDni } = require("../middlewares/verifyJwt");
const patientRoutes = (app) => {
  app.use("/api/v1/patients", router);
  router.post("/", [verifyToken, isAdmin], checkDuplicateDni, createPatient);
  router.get("/", getPatient);
  router.get("/:patientId", getPatientById);
  router.delete("/:patientId", [verifyToken, isAdmin], deletePatientById);
  router.put("/:patientId", [verifyToken, isAdmin], updatePatient);
};

module.exports = patientRoutes;
