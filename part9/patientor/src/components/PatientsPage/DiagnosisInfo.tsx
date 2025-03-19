import { useEffect, useState } from "react";
import patientService from '../../services/patients';

const DiagnosisInfo = ({ code }: { code: string}) => {
    const [description, setDescription] = useState<string>("");

    useEffect(() => {
        const fetchDescription = async () => {
            try {
                const result = await patientService.getDiagnosisDescription(code);
                setDescription(result);
            }catch(error) {
                console.log("error fetching diagnosis description");
            }
        };

        fetchDescription();
    }, [code]);

    return (
        <li>
            {code} {description && `${description}`}
        </li>
    );
};

export default DiagnosisInfo;