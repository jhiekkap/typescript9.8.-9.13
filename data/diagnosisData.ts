import data from './diagnoses.json';
import { Diagnosis } from '../src/types'; 

const diagnosisData: Diagnosis[] = data.map(obj => {
  const object = obj as Diagnosis; 
  return object;
});

export default diagnosisData;