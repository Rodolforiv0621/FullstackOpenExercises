import { diary } from "../types";
import axios from 'axios';
const base = "http://localhost:3000"

const getDiaries = async (): Promise<diary[]> => {
    const res = await axios.get<diary[]>(`${base}/api/diaries`);
    return res.data;
}

export default {
    getDiaries
}