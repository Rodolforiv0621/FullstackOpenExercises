import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import requests from "../services/requests";
import { useContext } from "react";
import notificationContext from "./notificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [notification, dispatch] = useContext(notificationContext)

  const newAnecdoteMutation = useMutation({
    mutationFn: requests.createAnecdote,
    onSuccess: (newAnecdote)=>{
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      dispatch({type: 'set', payload: `anecdote '${newAnecdote.content}' added`})
      setTimeout(() => {
        dispatch({type: 'reset'})
      }, 5000)
    },
    onError: (error) =>{
      dispatch({
        type: "set",
        payload: `too short anecdote, must have length 5 or more`,
      });
      setTimeout(() => {
        dispatch({ type: "reset" });
      }, 5000);
    }
  });

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, votes: 0})
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
