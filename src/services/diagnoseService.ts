import diagnoseData from '../../data/diagnoses.json'
import { Diagnosis } from '../types';


//const diaries: Array<DiaryEntry> = diaryData;

const diagnoses: Array<Diagnosis> = diagnoseData as Array<Diagnosis>;

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