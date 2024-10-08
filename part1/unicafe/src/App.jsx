import { useState } from "react";

const Header = ({header}) => {
  return(
    <div>
      <h2>{header}</h2>
    </div>
  )
}
const Button = ({text, handleClick}) => {
  return(
    <span>
      <button onClick={handleClick}>{text}</button>
    </span>
  )
}

const StatisticsLine = ({ text, stat }) => {
  return (
    <tr>
    <td>
      {text} 
    </td>
    <td>{stat}</td>
    </tr>
  );
};

const Statistics = (props) =>{
  if (props.bad == 0 && props.good == 0) {
    return(
      <p>No feedback given</p>
    )
  }else{
    return(
    <table>
      <tbody>
      <StatisticsLine text={"good"} stat={props.good} />
      <StatisticsLine text={"neutral"} stat={props.neutral} />
      <StatisticsLine text={"bad"} stat={props.bad} />
      <StatisticsLine text={"all"} stat={props.total} />
      <StatisticsLine text={"average"} stat={props.average} />
      <StatisticsLine text={"positive"} stat={props.positive + " %"}/> 
      </tbody>
    </table>
  )
  }
  
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = () =>{
    return bad + good + neutral
  }

  const average = () => {
    const b = bad * -1
    const g = good
    return (b + g)/ total()
  }

  const positive = () =>{
    return (good/total()) * 100
  }

  return (
    <div>
      <Header header={"Give Feedback"} />
      <Button text={"good"} handleClick={() => setGood((good) => good + 1)} />
      <Button text={"neutral"} handleClick={() => setNeutral((neutral) => neutral + 1)} />
      <Button text={"bad"} handleClick={() => setBad((bad) => bad + 1)} />
      <Header header={"Statistics"} />
      <Statistics good={good} neutral={neutral} bad={bad} total={total()} average={average()} positive={positive()}/>
    </div>
  );
}

export default App;
