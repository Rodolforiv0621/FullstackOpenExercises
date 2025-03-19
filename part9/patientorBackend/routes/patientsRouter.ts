import express from 'express';
import patientsService from '../services/patientsService';
import { Entry, newPatientsEntry, patientsEntry } from '../types';
import utils from '../utils';
import z from 'zod';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getNonSensitivePatientsEntries());
});


router.get('/:id', (req, res) => {
    const patient: patientsEntry | undefined = patientsService.getPatient(req.params.id);
    if (patient){
        res.status(200).send(patient);
    }else{
        res.status(404).send("No patient found");
    }
    
});

router.post('/', (req, res) => {
    try{
        const newPatientsEntry: newPatientsEntry = utils.toNewPatientsEntry(req.body);

        const addedEntry = patientsService.addPatient(newPatientsEntry);

        res.send(addedEntry);
    }catch(error: unknown){
       if(error instanceof z.ZodError){
        res.status(400).send({ error: error.issues });
       }else{
        res.status(400).send({ error: 'unknown' });
       }
    }
    
});

router.post('/:id/entries', (req, res) => {
    const id = req.params.id;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
    const object: any = req.body;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newEntry: Entry | null = patientsService.addPatientEntry(object, id);
    res.send(newEntry);
});

export default router;