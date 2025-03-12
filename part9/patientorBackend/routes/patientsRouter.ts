import express from 'express';
import patientsService from '../services/patientsService';
import { newPatientsEntry } from '../types';
import utils from '../utils';
import z from 'zod';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getNonSensitivePatientsEntries());
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
export default router;