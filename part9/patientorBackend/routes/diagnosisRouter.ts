import express from 'express';
import diagnosisService from '../services/diagnosisService'; 
const router = express.Router();

router.get('/', (_req, res) => {
    console.log("hello", diagnosisService.getDiagnosisEntries());
    res.send(diagnosisService.getDiagnosisEntries());
});

export default router;