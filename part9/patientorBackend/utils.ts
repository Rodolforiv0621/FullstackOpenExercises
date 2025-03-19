import { Gender, newPatientsEntry, diagnosisEntry } from "./types";
import z from 'zod';

const isString = (text: unknown): text is string => {
    return typeof text == 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseText = (text: unknown): string => {
    if(!text || !isString(text)){
        throw new Error('Incorrect or missing text');
    };
    return text;
};

const parseDate = (date: unknown): string => {
    if(!date || !isString(date) || !isDate(date)){
        throw new Error("Incorrect or missing date: " + date);
    }
    return date;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if(!gender || !isString(gender) || !isGender(gender)){
        throw new Error("Incorrect or missing gender");
    }
    return gender;
};

const toNewPatientsEntry = (object: unknown): newPatientsEntry => {
    if (!object || typeof object !== 'object'){
        throw new Error('Incorrect or missing data');
    }
    if('name' in object && 'dateOfBirth' in object && 'gender' in object && 'occupation' in object && 'ssn' in object){
        const newEntry: newPatientsEntry = {
            name: z.string().parse(object.name),
            dateOfBirth: z.string().date().parse(object.dateOfBirth),
            gender: z.nativeEnum(Gender).parse(object.gender),
            occupation: z.string().parse(object.occupation),
            ssn: z.string().parse(object.ssn)
        };
        return newEntry;
    }
    throw new Error("Some fields are missing");
};

const parseDiagnosisCodes = (object: unknown): Array<diagnosisEntry['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      // we will just trust the data to be in correct form
      return [] as Array<diagnosisEntry['code']>;
    }
  
    return object.diagnosisCodes as Array<diagnosisEntry['code']>;
  };

export default {
    toNewPatientsEntry,
    parseDate,
    parseGender,
    parseText,
    parseDiagnosisCodes
};