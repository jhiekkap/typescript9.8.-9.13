"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }
    return name;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDateOfBirth = (dateOfBirth) => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing dateOfBirth: ' + dateOfBirth);
    }
    return dateOfBirth;
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn: ' + ssn);
    }
    return ssn;
};
const isGender = (param) => {
    return Object.values(types_1.Gender).includes(param);
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    return occupation;
};
const parseSpecialist = (specialist) => {
    if (!isString(specialist)) {
        throw new Error('Incorrect specialist: ' + specialist);
    }
    return specialist;
};
const parseDiagnosisCodes = (diagnosisCodes) => {
    if (!Array.isArray(diagnosisCodes) || (Array.isArray(diagnosisCodes) && diagnosisCodes.find(code => !isString(code)).length > 0)) {
        throw new Error('Incorrect diagnosisCodes: ' + diagnosisCodes);
    }
    return diagnosisCodes;
};
const parseType = (type) => {
    if (!['Hospital', 'HealthCheck', 'OccupationalHealthcare'].includes(type)) {
        throw new Error('Incorrect type: ' + type);
    }
    return type;
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
const parseDescription = (description) => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description: ' + description);
    }
    return description;
};
const parseDischarge = (discharge) => {
    if (!discharge || !discharge.date || !isString(discharge.date) || !isDate(discharge.date)
        || !discharge.criteria || !isString(discharge.criteria)) {
        throw new Error('Incorrect or missing discharge: ' + discharge);
    }
    return discharge;
};
const parseHealthCheckRating = (healthCheckRating) => {
    if (!healthCheckRating || isNaN(healthCheckRating) || healthCheckRating < 0
        || healthCheckRating > 4 || !Number.isInteger(healthCheckRating)) {
        throw new Error('Incorrect or missing healthCheckRating: ' + healthCheckRating);
    }
    return healthCheckRating;
};
const parseEmployerName = (employerName) => {
    if (!employerName || !isString(employerName)) {
        throw new Error('Incorrect or missing employerName: ' + employerName);
    }
    return employerName;
};
const parseSickLeave = (sickLeave) => {
    if (!sickLeave || !sickLeave.startDate || !isString(sickLeave.startDate) || !isDate(sickLeave.startDate)
        || !sickLeave.endDate || !isString(sickLeave.endDate) || !isDate(sickLeave.endDate)) {
        throw new Error('Incorrect or missing sickLeave: ' + sickLeave);
    }
    return sickLeave;
};
exports.toNewEntry = (object) => {
    const baseFields = {
        type: parseType(object.type),
        date: parseDate(object.date),
        description: parseDescription(object.description),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
    };
    const hospitalFields = Object.assign(Object.assign({}, baseFields), { discharge: parseDischarge(object.discharge) });
    const healthCheckFields = Object.assign(Object.assign({}, baseFields), { healthCheckRating: parseHealthCheckRating(object.healthCheckRating) });
    const occupationalFields = Object.assign(Object.assign({}, baseFields), { employerName: parseEmployerName(object.employerName), sickLeave: parseSickLeave(object.sickLeave) });
    switch (object.type) {
        case 'Hospital':
            return Object.assign(Object.assign({}, hospitalFields), { type: "Hospital" });
        case 'HealthCheck':
            return Object.assign(Object.assign({}, healthCheckFields), { type: "HealthCheck" });
        case 'OccupationalHealthcare':
            return Object.assign(Object.assign({}, occupationalFields), { type: "OccupationalHealthcare" });
        default:
            return undefined;
    }
};
const toNewPatient = (object) => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: object.entries
    };
};
exports.default = toNewPatient;
