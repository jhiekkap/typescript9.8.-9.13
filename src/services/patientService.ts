//import patientData from '../../data/patients.json'
import patientData from '../../data/patientData'
import {
    Patient, NonSensitivePatientData, NewPatient, Entry, NewHospitalEntry,
    NewOccupationalHealthcareEntry, NewHealthCheckEntry,
} from '../types';
 
let patients: Array<Patient> = patientData as Array<Patient>;
 
const getPatients = (): Array<Patient> => {
    return patients;
};

const getPatient = (id: string): Patient | undefined => {
    return patients.find(patient => patient.id === id);
};

const getNonSensitivePatientData = (): NonSensitivePatientData[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const makeId = (): string => { 
    const chars = 'ABCDE23456789';
    let result = '';
    for (let i = 6; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

const addPatient = (entry: NewPatient): Patient => {
    const newPatient: Patient = { id: makeId(), ...entry };
    patients.push(newPatient);
    return newPatient;
}

const addEntry = (id: string, newEntry: NewHospitalEntry |
    NewOccupationalHealthcareEntry | NewHealthCheckEntry): Patient | void => { 
    const patientToUpdate: Patient | undefined = patients.find(patient => patient.id === id);
    if (patientToUpdate) {
        const entries: Entry[] = patientToUpdate.entries || []
        const entry: Entry = { id: makeId(), ...newEntry }
        const updatedPatient: Patient = {
            ...patientToUpdate,
            entries: entries.concat(entry)
        };
        patients = patients.map(patient => patient.id === id ? updatedPatient : patient)
        console.log('UPDATED PATIENT', updatedPatient)
        return updatedPatient;
    }
}

export default {
    getPatients,
    getPatient,
    getNonSensitivePatientData,
    addPatient,
    addEntry
};