import patientsEntries from '../data/patients';
import { newPatientsEntry, nonSensitivePatientsEntries, patientsEntry } from '../types';
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
        ...entry
    };
    patientsEntries.push(newPatientsEntry);
    return newPatientsEntry;
};

export default {
    getNonSensitivePatientsEntries,
    addPatient
};