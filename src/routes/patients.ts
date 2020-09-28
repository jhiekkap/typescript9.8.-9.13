import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientData());
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  res.send(patientService.getPatient(id));
})

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedEntry = patientService.addPatient(newPatient);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const entry = req.body ;
    const { id } = req.params;
    const upDatedPatient = patientService.addEntry(id, entry);
    res.json(upDatedPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }  
});

export default router;