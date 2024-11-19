import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from '../services/anecdotes'

// const anecdotesAtStart = [
//   "If it hurts, do it more often",
//   "Adding manpower to a late software project makes it later!",
//   "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
//   "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
//   "Premature optimization is the root of all evil.",
//   "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
// ];

// const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   };
// };

// export const createAnecdote = (anecdote) => {
//   return {
//     type: "CREATE",
//     anecdote: anecdote,
//   };
// };

// export const voteAnecdote = (id) => {
//   return {
//     type: "VOTE",
//     id: id,
//   };
// };

// const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action){
      const index = state.findIndex(a => a.id === action.payload.id)
      if (index !== -1) {
        state[index] = action.payload
      }
      state.sort((a,b) => b.votes - a.votes)
    },
    createAnecdote(state, action){
      state.push(action.payload)
    },
    setAnecdotes(state, action){
      return action.payload
    }
  }
})

export const {voteAnecdote, createAnecdote, setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dipatch => {
    const anecdotes = await anecdoteService.getAll()
    anecdotes.sort((a,b) => b.votes - a.votes)
    dipatch(setAnecdotes(anecdotes))
  }
}

export const addNewAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(createAnecdote(newAnecdote));
  }
}

export const addLike = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateLikes(anecdote)
    dispatch(voteAnecdote(updatedAnecdote));
  }
}

export default anecdoteSlice.reducer
