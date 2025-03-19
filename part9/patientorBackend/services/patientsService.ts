import patientsEntries from '../data/patients';
import { newPatientsEntry, nonSensitivePatientsEntries, Patient, patientsEntry, Entry, baseEntry, OccupationalHealthcareEntry, HospitalEntry, HealthCheckEntry } from '../types';
import {v1 as uuid} from 'uuid';

const getNonSensitivePatientsEntries = (): nonSensitivePatientsEntries[] => {
    return patientsEntries.map(entry => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {ssn, ...nonSensitiveInfo} = entry;
        return nonSensitiveInfo;
    });
};

const addPatient = (entry: newPatientsEntry): patientsEntry => {
    const newPatientsEntry = {
        id: uuid(),
        entries: [],
        ...entry
    };
    patientsEntries.push(newPatientsEntry);
    return newPatientsEntry;
};

const getPatient = (id: string): Patient | undefined => {
    const patientEntry: Patient | undefined = patientsEntries.find(p => p.id === id);
    if (patientEntry){
        const patient = {...patientEntry};
        return patient;
    }else{
        return patientEntry;
    }
    
};

const addPatientEntry = (object: Entry, patientId: string): Entry | null => {
    const newBaseEntry: baseEntry = {
        id: uuid(),
        description: object.description,
        date: object.date,
        specialist: object.specialist,
        diagnosisCodes: object.diagnosisCodes
    };
    console.log(newBaseEntry.id);
    const user = patientsEntries.find(patient => patient.id === patientId);
    if (!user) return null;
    switch(object.type){
        case "OccupationalHealthcare":{
            const newOccupationalHealthcareEntry: OccupationalHealthcareEntry = {
                ...newBaseEntry, 
                ...(object.employerName ? {employerName: object.employerName } : {}),
                ...(object.sickLeave ? {sickLeave: {startDate: object.sickLeave.startDate, endDate: object.sickLeave.endDate}} : {}),
                type: "OccupationalHealthcare"
            };
            user.entries = user.entries.concat(newOccupationalHealthcareEntry);
            return newOccupationalHealthcareEntry;
        }
        case "Hospital": {
            const newHospitalEntry: HospitalEntry = {
                ...newBaseEntry,
                discharge: {
                    date: object.discharge.date,
                    criteria: object.discharge.criteria
                },
                type: "Hospital"
            };
            user.entries = user.entries.concat(newHospitalEntry);
            return newHospitalEntry;
        }
        case "HealthCheck": {
            const newHealthCheckEntry: HealthCheckEntry = {
                ...newBaseEntry,
                healthCheckRating: object.healthCheckRating,
                type: "HealthCheck"
            };
            user.entries = user?.entries.concat(newHealthCheckEntry);
            return newHealthCheckEntry;
        }
        default:
            return newBaseEntry as Entry;
    }
    
};

export default {
    getNonSensitivePatientsEntries,
    addPatient,
    getPatient,
    addPatientEntry
};