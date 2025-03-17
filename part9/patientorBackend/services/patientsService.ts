import patientsEntries from '../data/patients';
import { newPatientsEntry, nonSensitivePatientsEntries, Patient, patientsEntry } from '../types';
import {v1 as uuid} from 'uuid';
// eslint-disable-next-line
const id = uuid() as string;

const getNonSensitivePatientsEntries = (): nonSensitivePatientsEntries[] => {
    return patientsEntries.map(entry => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {ssn, ...nonSensitiveInfo} = entry;
        return nonSensitiveInfo;
    });
};

const addPatient = (entry: newPatientsEntry): patientsEntry => {
    const newPatientsEntry = {
        id: id,
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

export default {
    getNonSensitivePatientsEntries,
    addPatient,
    getPatient
};