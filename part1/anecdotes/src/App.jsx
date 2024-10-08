import { useState } from "react";
const Header = ({header}) =>{
  return(
    <h2>{header}</h2>
  )
}

const Anecdote = ({anecdote}) =>{
  return(
    <div>{anecdote}</div>
  )
}

const Votes = ({votes, v}) =>{
  return <div>has {votes[v]} votes</div>;
}

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(8).fill(0))
  const [mostVotes, setMostVotes] = useState(0)
  const randomNumberInRange = (min, max, selected) => {
    let n
    do{
       n = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (n === selected)
    return n
  };

 const updateVote = () => {
   const copy = [...votes];
   copy[selected] += 1;

   setVotes(copy);

   const maxVotesIndex = getLargest(copy);
   setMostVotes(maxVotesIndex);
 };

  const getLargest = (copy) =>{
    let largestIndex = 0;
    for (let i = 0;i<copy.length;i++){
      if (copy[i] > copy[largestIndex]) {
        largestIndex = i;
      }
    }
    return largestIndex; 
  }
  
  return (
    <>
    <Header header={"Anecdote of the day"}/>
    <Anecdote anecdote={anecdotes[selected]}/>
    <Votes votes={votes} v={selected}/>
    <button onClick={updateVote}>vote</button>
    <button onClick={() => setSelected(selected => randomNumberInRange(0,7, selected))}>Next Anectdote</button>
    <Header header={"Anecdote with most votes"}/>
    <Anecdote anecdote={anecdotes[mostVotes]}/>
    <Votes votes = {votes} v = {mostVotes}/>
    </>
  )
}

export default App;
