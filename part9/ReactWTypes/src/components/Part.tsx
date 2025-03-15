interface type{
    name: string;
    exerciseCount: number;
    kind: string;
    description?: string;
    groupProjectCount?: number;
    backgroundMaterial?: string;
    requirements?: string[];
}

const Part = (props: type) => {
    let content;
    switch (props.kind) {
        case "basic":
            content = (<>{props.description && <p>{props.description}</p>}</>)
            break;
        case "group":
            content = (<p>Project Exercises {props.groupProjectCount}</p>)
            break;
        case "background":
            content = (<>
                <>{props.description && <p>{props.description}</p>}</>
                <p>Submit to {props.backgroundMaterial}</p>
            </>)
            break;
        case "special":
            content = (<>
                <>{props.description && <p>{props.description}</p>}</>
                <p>required skills: {props.requirements && props.requirements.join(', ')}</p>
            </>)
            break;
        default:
            break;
    }
    return (
        <>
            {content}   
        </>
    )
}

export default Part;