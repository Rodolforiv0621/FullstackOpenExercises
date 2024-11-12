import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import requests from "./services/requests"
import { useReducer, useContext } from 'react'
import notificationContext from './components/notificationContext'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "set":
      return action.payload;
    case "reset":
      return '';
    default:
      return state;
  }
};

const App = () => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')
  const queryClient = useQueryClient()
  // const [notification, dispatch] = useContext(notificationContext)

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: requests.getAnecdotes,
    retry: 1
  });

  const updateAnecdoteMutation = useMutation({
    mutationFn: requests.updateAnecdote,
    onSuccess: (anecdote) =>{
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const newAnecdotes = anecdotes.map(current => current.id === anecdote.id ? anecdote : current)
      queryClient.setQueryData(['anecdotes'], newAnecdotes)
      notificationDispatch({type: 'set', payload: `anecdote '${anecdote.content}' voted`})
      setTimeout(() => {
        notificationDispatch({type: 'reset'})
      }, 5000)
    }
  })
  // console.log(JSON.parse(JSON.stringify(result)))
  
  if(result.isLoading || result.isPending){
    return <div>data loading...</div>
  }

  if(result.isError){
    return <div>Anecdote service not available due to problems in server</div>
  }

  const handleVote = (anecdote) => {
    const newAnecdote = {...anecdote, votes: anecdote.votes + 1}
    updateAnecdoteMutation.mutate(newAnecdote)
  }

  const anecdotes = result.data

  return (
    <notificationContext.Provider value={[notification, notificationDispatch]}>
    <div>
      <h3>Anecdote app</h3>
    
      <Notification notification={notification}/>
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
    </notificationContext.Provider>
  )
}

export default App
