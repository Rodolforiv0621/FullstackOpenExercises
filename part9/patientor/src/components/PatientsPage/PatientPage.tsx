import { useEffect, useState } from "react";
import { Patient } from "../../types";
import patientServices from '../../services/patients';
import { useParams } from "react-router-dom";
import DiagnosisInfo from "./DiagnosisInfo";
import AddEntry from '../../components/PatientsPage/AddEntry';

const PatientPage = () => {
    const [patient, setPatient] = useState<Patient | null>(null);
    const id = useParams().id;
    const getType = (type: string): string => {
        switch(type){
            case "Hospital":
                return 'red';
            case "OccupationalHealthcare":
                return "blue";
            default:
                return "gray";
        }
    };
    useEffect(() => {
        const getPatient = async () => {
            const pat = await patientServices.getPatient(id);
            if(pat){
                setPatient(pat);
            }else{
                console.log("error receiving patient information");
            }
            
        }; 
        getPatient();
    }, [id]);
    if (!patient){
        return (<></>);
    }
    return (
        <>
            <h2>{patient.name}</h2>
            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            <AddEntry id={id}/>
            <h3>entries</h3>
            {patient.entries && patient.entries.map(entry => (
                <div key={entry.id} style={{border: `2px solid ${getType(entry.type)}`, padding: '5px', marginBottom: "5px"}}>
                    <p>{entry.date}</p>
                    <p>{entry.description}</p>
                    {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
                        <ul>
                            {entry.diagnosisCodes.map((code, index) => (
                                <DiagnosisInfo key={index} code={code}/>
                            ))}
                        </ul>
                    )}
                    <p>diagnose by {entry.specialist}</p>
                </div>
            ))}
            {/* {patient && console.log(patient)} */}
        </>
    );
};

export default PatientPage;