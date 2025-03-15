interface headerProps{
    courseName: string;
}
const Header = (props: headerProps) =>{
    return (
        <div>
            <h1>{props.courseName}</h1>
        </div>
    )
}

export default Header