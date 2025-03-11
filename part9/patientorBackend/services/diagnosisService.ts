import diagnosisEntries from '../data/diagnosis';
import { diagnosisEntry} from '../types';

const getDiagnosisEntries = (): diagnosisEntry[] => {
    return diagnosisEntries;
};

export default {
    getDiagnosisEntries,
};