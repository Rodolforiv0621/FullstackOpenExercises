export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}


export interface Entry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  type: string;
  diagnosisCodes?: string[];
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;



export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: string[];
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
  employerName?: string;
  type: "OccupationalHealthcare";
}

export interface HospitalEntry extends BaseEntry {
  discharge: {
    date: string;
    criteria: string;
  };
  type: "Hospital";
}

export interface HealthCheckEntry extends BaseEntry {
  healthCheckRating: number;
  type: "HealthCheck";
}

export type EntryType = "OccupationalHealthcare" | "Hospital" | "HealthCheck";

export type Entries = OccupationalHealthcareEntry | HospitalEntry | HealthCheckEntry;