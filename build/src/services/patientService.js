"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import patientData from '../../data/patients.json'
const patientData_1 = __importDefault(require("../../data/patientData"));
let patients = patientData_1.default;
const getPatients = () => {
    return patients;
};
const getPatient = (id) => {
    return patients.find(patient => patient.id === id);
};
const getNonSensitivePatientData = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const makeId = () => {
    const chars = 'ABCDE23456789';
    let result = '';
    for (let i = 6; i > 0; --i)
        result += chars[Math.floor(Math.random() * chars.length)];
    return result;
};
const addPatient = (entry) => {
    const newPatient = Object.assign({ id: makeId() }, entry);
    patients.push(newPatient);
    return newPatient;
};
const addEntry = (id, newEntry) => {
    const patientToUpdate = patients.find(patient => patient.id === id);
    if (patientToUpdate) {
        const entries = patientToUpdate.entries || [];
        const entry = Object.assign({ id: makeId() }, newEntry);
        const updatedPatient = Object.assign(Object.assign({}, patientToUpdate), { entries: entries.concat(entry) });
        patients = patients.map(patient => patient.id === id ? updatedPatient : patient);
        console.log('UPDATED PATIENT', updatedPatient);
        return updatedPatient;
    }
};
exports.default = {
    getPatients,
    getPatient,
    getNonSensitivePatientData,
    addPatient,
    addEntry
};
