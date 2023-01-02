const Patient = require("../models/Patient");
const createPatient = async (req, res) => {
  const { name, last_name, email, number_phone, address, age, dni } = req.body;
  console.log(name);
  try {
    // const newProduct = new Patient({ ...req.body });
    const newPatient = new Patient({
      name,
      last_name,
      email,
      number_phone,
      address,
      age,
      dni,
    });
    const patientSave = await newPatient.save();

    res.status(201).json(patientSave);
  } catch (error) {
    console.log(error);
  }
};
const getPatient = async (req, res) => {
  const patients = await Patient.find();
  res.json(patients);
};
const getPatientById = async (req, res) => {
  const patient = await Patient.findById(req.params.patientId);
  res.status(200).json(patient);
};
const updatePatient = async (req, res) => {
  const updatePatient = await Patient.findByIdAndUpdate(
    req.params.patientId,
    req.body,
    { new: true }
  ); // el segundo es el dato que queremos actualizar
  res.status(200).json(updatePatient);
};
const deletePatientById = async (req, res) => {
  const { patientId } = req.params;
  await Patient.findByIdAndDelete(patientId);
  res.status(204).json();
};
module.exports = {
  createPatient,
  getPatient,
  getPatientById,
  updatePatient,
  deletePatientById,
};
