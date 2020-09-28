import data from './patients.json';
import { Patient } from '../src/types';
import toNewPatient from "../src/utils";

const patientData: Patient[] = data.map(obj => {
  const object = toNewPatient(obj) as Patient;
  object.id = obj.id;
  return object;
});

export default patientData;