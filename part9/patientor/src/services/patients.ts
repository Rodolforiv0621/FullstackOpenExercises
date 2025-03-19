import axios from "axios";
import { Entries, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const getPatient = async (object: string | undefined) => {
  if (!object){
    console.log('Id is undefined');
    return;
  }
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${object}`);
  return data;
};

const getDiagnosisDescription = async (code: string) => {
  const { data } = await axios.get<string>(`${apiBaseUrl}/diagnosis/${code}`);
  return data;
};

const addPatientEntry = async (object: Entries, id: string|undefined) => {
  if (!id){
    return "id missing";
  }
  const { data } = await axios.post<Entries>(`${apiBaseUrl}/patients/${id}/entries`, object);
  return data;
};

export default {
  getAll, create, getPatient, getDiagnosisDescription, addPatientEntry
};

