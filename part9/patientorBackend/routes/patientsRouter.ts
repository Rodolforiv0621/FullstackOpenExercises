/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getNonSensitivePatientsEntries());
});

router.post('/', (req, res) => {
    const {name, dateOfBirth, ssn, gender, occupation} = req.body;
    const addedEntry = patientsService.addPatient({
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation
    });
    res.send(addedEntry);
});
export default router;