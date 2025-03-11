import express from "express";
import diagnosisRouter from './routes/diagnosisRouter';
import patientsRouter from './routes/patientsRouter';
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-require-imports
const cors = require('cors');
const app = express();
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) =>{
    res.send("Pong");
});

app.use('/api/diagnosis', diagnosisRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, ()=>{
    console.log("listening on port", PORT);
});