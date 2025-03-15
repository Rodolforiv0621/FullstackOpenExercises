interface exerciseNumber{
    total: number
}

const Total = (props: exerciseNumber) => {
    return (
        <div> 
            <p>Number of exercises {props.total}</p>
        </div>
    )
}

export default Total;