import Diaries from "./components/Diaries"
import DiaryForm from "./components/DiaryForm"
import { useState, useEffect } from "react";
import { diary } from "../types";
import diaryServices from '../services/diaryServices'

function App() {
  const [diaries, setDiaries] = useState<diary[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    diaryServices.getDiaries()
      .then((data) => {
          setDiaries(data);
      })
      .catch((error) => {
          setError("failed to get diaries");
          alert(error)
      })
  }, [])

  if (error) {
      return <div>{error}</div>
  }
  return (
    <>
      <DiaryForm diaries={diaries} setDiaries={setDiaries}/>
      <Diaries diaries={diaries}/>
    </>
  )
}

export default App
