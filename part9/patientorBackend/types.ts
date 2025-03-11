export interface diagnosisEntry {
    code: string,
    name: string,
    latin?: string
}

export enum Gender {
    Male = "male",
    Female = 'female'
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



