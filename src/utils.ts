import {
    NewPatient, Gender, NewHospitalEntry, NewOccupationalHealthcareEntry,
    NewHealthCheckEntry, Diagnosis, Discharge, HealthCheckRating, SickLeave
} from './types';


const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: any): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }
    return name;
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDateOfBirth = (dateOfBirth: any): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing dateOfBirth: ' + dateOfBirth);
    }
    return dateOfBirth;
};

const parseSsn = (ssn: any): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn: ' + ssn)
    }
    return ssn;
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    return occupation;
};
 
const parseSpecialist = (specialist: any): string | undefined => {
    if (!isString(specialist)) {
        throw new Error('Incorrect specialist: ' + specialist);
    }
    return specialist;
}

 
const parseDiagnosisCodes = (diagnosisCodes: any): Array<Diagnosis['code']> | undefined => {
    if (!Array.isArray(diagnosisCodes) || (Array.isArray(diagnosisCodes) && diagnosisCodes.find(code => !isString(code)).length > 0)) {
        throw new Error('Incorrect diagnosisCodes: ' + diagnosisCodes);
    }
    return diagnosisCodes;
}

const parseType = (type: any): 'Hospital' | 'HealthCheck' | 'OccupationalHealthcare' => {
    if (!['Hospital', 'HealthCheck', 'OccupationalHealthcare'].includes(type)) {
        throw new Error('Incorrect type: ' + type);
    }
    return type;
}

const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseDescription = (description: any): string => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description: ' + description)
    }
    return description;
};

const parseDischarge = (discharge: any): Discharge => {
    if (!discharge || !discharge.date || !isString(discharge.date) || !isDate(discharge.date)
        || !discharge.criteria || !isString(discharge.criteria)) {
        throw new Error('Incorrect or missing discharge: ' + discharge)
    }
    return discharge;
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
    if (!healthCheckRating || isNaN(healthCheckRating) || healthCheckRating < 0
        || healthCheckRating > 4 || !Number.isInteger(healthCheckRating)) {
        throw new Error('Incorrect or missing healthCheckRating: ' + healthCheckRating)
    }
    return healthCheckRating;
};

const parseEmployerName = (employerName: any): string => {
    if (!employerName || !isString(employerName)) {
        throw new Error('Incorrect or missing employerName: ' + employerName)
    }
    return employerName;
};

const parseSickLeave = (sickLeave: any): SickLeave => {
    if (!sickLeave || !sickLeave.startDate || !isString(sickLeave.startDate) || !isDate(sickLeave.startDate)
        || !sickLeave.endDate || !isString(sickLeave.endDate) || !isDate(sickLeave.endDate)) {
        throw new Error('Incorrect or missing sickLeave: ' + sickLeave)
    }
    return sickLeave;
};

 
export const toNewEntry = (object: any): NewHospitalEntry | NewOccupationalHealthcareEntry | NewHealthCheckEntry | undefined => {
    const baseFields = {
        type: parseType(object.type),
        date: parseDate(object.date),
        description: parseDescription(object.description),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
    } 

    const hospitalFields = {
        ...baseFields,
        discharge: parseDischarge(object.discharge)
    } 

    const healthCheckFields = {
        ...baseFields,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
    }

    const occupationalFields = {
        ...baseFields,
        employerName: parseEmployerName(object.employerName),
        sickLeave: parseSickLeave(object.sickLeave) 
    }
 
    switch (object.type) {
        case 'Hospital':
            return {
                ...hospitalFields, type: "Hospital"
            }
        case 'HealthCheck':
            return {
                ...healthCheckFields, type: "HealthCheck"
            }
        case 'OccupationalHealthcare':
            return {
                ...occupationalFields, type: "OccupationalHealthcare"
            }
        default:
            return undefined
    }

}


const toNewPatient = (object: any): NewPatient => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: object.entries
    };
};
 
export default toNewPatient;

