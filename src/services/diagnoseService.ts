import diagnosisData from '../../data/diagnosisData';
import { Diagnosis } from '../types';
  
//const diagnoses: Array<Diagnosis> = diagnoseData as Array<Diagnosis>;
const diagnoses: Array<Diagnosis> = diagnosisData;
const getEntries = (): Array<Diagnosis> => {
    return diagnoses;
};
 

const addEntry = () => {
    return null;
};

export default {
    getEntries, 
    addEntry
};