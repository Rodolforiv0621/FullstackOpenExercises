import { diary } from '../../types';
interface incoming {
    diaries: diary[]
}

const Diaries = (props: incoming) => {
    
    return (
        <div>
            <h2>Diary Entries</h2>
            {props.diaries.map((diary) => (
                <div key={diary.id}>
                    <h3>{diary.date}</h3>
                    <p>Visibility: {diary.visibility}</p>
                    <p>Weather: {diary.weather}</p>
                    {diary.comment && <p>Comment: {diary.comment}</p>}
                </div>
            ))}
        </div>
    )
}

export default Diaries;