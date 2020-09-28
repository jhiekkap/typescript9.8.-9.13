export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export interface Discharge {
    date: string;
    criteria: string;
}

export interface SickLeave {
    startDate: string;
    endDate: string;
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist?: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}


interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    sickLeave?: SickLeave;
    employerName: string;
}

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

export type NewHospitalEntry = Omit<HospitalEntry, 'id'>;
export type NewOccupationalHealthcareEntry = Omit<OccupationalHealthcareEntry, 'id'>;
export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;
export type NewEntry = Omit<Entry, 'id'>;

export interface Patient {
    id: string;
    name: string;
    dateOfBirth?: string;
    ssn: string;
    gender: string;
    occupation: string;
    entries?: Entry[]
}

export type NonSensitivePatientData = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id'>;


