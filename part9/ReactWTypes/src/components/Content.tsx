import Part from "./Part";

interface exercisePart {
    name: string;
    exerciseCount: number;
    kind: string;
    description?: string;
    groupProjectCount?: number;
    backgroundMaterial?: string;
    requirements?: string[];
}

const Content = (props: exercisePart) => {
    return (
        <div>
            <h3>
                {props.name} {props.exerciseCount}
            </h3>
            <Part {...props}/>
        </div>
    )
} 

export default Content