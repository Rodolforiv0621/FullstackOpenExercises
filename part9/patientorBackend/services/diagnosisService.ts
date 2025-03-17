import diagnosisEntries from '../data/diagnosis';
import { diagnosisEntry} from '../types';

const getDiagnosisEntries = (): diagnosisEntry[] => {
    return diagnosisEntries;
};

const getDiagnosisDescription = (code: string): string | undefined=> {
    const entry: diagnosisEntry | undefined = diagnosisEntries.find(entry => entry.code === code);
    if (entry){
        return entry.name;
    }
    return undefined;
};

export default {
    getDiagnosisEntries,
    getDiagnosisDescription
};