import express from 'express';
import diagnosisService from '../services/diagnosisService'; 
const router = express.Router();

router.get('/', (_req, res) => {
    console.log("hello", diagnosisService.getDiagnosisEntries());
    res.send(diagnosisService.getDiagnosisEntries());
});

router.get('/:id', (req, res) => {
    const code = req.params.id;
    res.send(diagnosisService.getDiagnosisDescription(code));
});

export default router;