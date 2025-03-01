import express from "express";
import { calculateBmi } from "./calculateBmi";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send("Hello Full Stack!");
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    const result = {
        height: height,
        weight: weight,
        bmi: calculateBmi(height, weight)
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !isNaN(height) && !isNaN(weight) ? res.json(result) : res.status(404).json({error: "malformatted parameters"});
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const arr: number[] = req.body.daily_exercises;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const target: number = req.body.target;
    if (!Array.isArray(arr) || !arr.every(element => typeof element === "number") || typeof target !== 'number'){
        res.status(404).send({ error: 'malformatted parameters'});
    }else{
        const result = calculateExercises(arr, target);
        res.status(200).json(result);
    }
    
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log("Server running on port ", PORT);
});

