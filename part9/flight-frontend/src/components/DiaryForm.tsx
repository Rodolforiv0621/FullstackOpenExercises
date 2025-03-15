import { useState } from "react";
import { diary, Visibility, Weather } from "../../types";
// import { Visibility } from "../../types";

interface incoming {
    diaries: diary[];
    setDiaries: React.Dispatch<React.SetStateAction<diary[]>>;
}

const DiaryForm = (props: incoming) => {
    const [date, setDate] = useState<string>('')
    const [visibility, setVisibility] = useState<Visibility>(Visibility.Other)
    const [weather, setWeather] = useState<Weather>(Weather.Other)
    const [comment, setComment] = useState<string>('')


    const addDiary = (event: React.SyntheticEvent): void => {
        event.preventDefault()
        if (!Object.values(Weather).find(w => w.toString() === weather)){
            alert(`Error: Incorrect visibility: ${weather}`)
            return
        }
        if (!Object.values(Visibility).find(g => g.toString() === visibility)){
            alert(`Error: Incorrect visibility: ${visibility}`)
            return
        }
        //const vis: Visibility = Object.values(Visibility).find(g => g.toString() === visibility);
        const diaryToAdd: diary = {
            date: date,
            visibility: visibility,
            weather: weather,
            comment: comment,
            id: Number(props.diaries.length + 1)
        }
        props.setDiaries(props.diaries.concat(diaryToAdd))
        setDate('')
        setVisibility(Visibility.Other)
        setWeather(Weather.Other)
        setComment('')
    }
    return (
        <>
            <h2>Add New Entry</h2>
            <form onSubmit={addDiary}>
                <div>
                    date
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
                </div>
                <div>
                    visiblity
                    <label>
                        <input 
                            type="radio"
                            name="visibility"
                            value={Visibility.Good}
                            checked={visibility === Visibility.Good}
                            onChange={(e) => setVisibility(e.target.value as Visibility)}
                        />
                        Good
                    </label>
                    <label>
                        <input 
                            type="radio"
                            name="visibility"
                            value={Visibility.Great}
                            checked={visibility === Visibility.Great}
                            onChange={(e) => setVisibility(e.target.value as Visibility)}
                        />
                        Great
                    </label>
                    <label>
                        <input 
                            type="radio"
                            name="visibility"
                            value={Visibility.Ok}
                            checked={visibility === Visibility.Ok}
                            onChange={(e) => setVisibility(e.target.value as Visibility)}
                        />
                        Ok
                    </label>
                    <label>
                        <input 
                            type="radio"
                            name="visibility"
                            value={Visibility.Poor}
                            checked={visibility === Visibility.Poor}
                            onChange={(e) => setVisibility(e.target.value as Visibility)}
                        />
                        Poor
                    </label>
                </div>
                <div>
                    weather
                    <label>
                        <input 
                            type="radio"
                            name="weather"
                            value={Weather.Sunny}
                            checked={weather === Weather.Sunny}
                            onChange={(e) => setWeather(e.target.value as Weather)}
                        />
                        Sunny
                    </label>
                    <label>
                        <input 
                            type="radio"
                            name="weather"
                            value={Weather.Rainy}
                            checked={weather === Weather.Rainy}
                            onChange={(e) => setWeather(e.target.value as Weather)}
                        />
                        Rainy
                    </label>
                    <label>
                        <input 
                            type="radio"
                            name="weather"
                            value={Weather.Cloudy}
                            checked={weather === Weather.Cloudy}
                            onChange={(e) => setWeather(e.target.value as Weather)}
                        />
                        Cloudy
                    </label>
                    <label>
                        <input 
                            type="radio"
                            name="weather"
                            value={Weather.Stormy}
                            checked={weather === Weather.Stormy}
                            onChange={(e) => setWeather(e.target.value as Weather)}
                        />
                        Stormy
                    </label>
                    <label>
                        <input 
                            type="radio"
                            name="weather"
                            value={Weather.Windy}
                            checked={weather === Weather.Windy}
                            onChange={(e) => setWeather(e.target.value as Weather)}
                        />
                        Windy
                    </label>
                </div>
                <div>
                    comment
                    <input value={comment} onChange={(e) => setComment(e.target.value)}/>
                </div>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default DiaryForm;