export interface diagnosisEntry {
    code: string,
    name: string,
    latin?: string
}

export enum Gender {
    Male = "male",
    Female = 'female',
    Other = ''
}
export interface patientsEntry {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string,
    occupation: string
}

export type nonSensitivePatientsEntries = Omit<patientsEntry, 'ssn'>;

export type newPatientsEntry = Omit<patientsEntry, 'id'>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
   
}

export interface Patient {
    id: string;
    name: string;
    ssn: string;
    occupation: string;
    gender: string;
    dateOfBirth: string;
    entries: Entry[]
}

interface baseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: string[];
} 

export interface OccupationalHealthcareEntry extends baseEntry{
    sickLeave: {
        startDate: string;
        endDate: string;
    }
    type: "OccupationalHealthcare";

}

export interface HospitalEntry extends baseEntry{
    discharge: {
        date: string;
        criteria: string;
    }
    type: "Hospital";
}
