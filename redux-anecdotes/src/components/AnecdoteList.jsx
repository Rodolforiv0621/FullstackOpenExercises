import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteList = () =>{
    const dispatch = useDispatch()
    const anecdotes = useSelector((state) => state.anecdotes);
    const filter = useSelector(state => state.filter)

    const filteredAnecdotes = anecdotes.filter(anecdotes => anecdotes.content.toLowerCase().includes(filter.toLowerCase()))

    const vote = (id, content) => {
      dispatch(voteAnecdote(id));
      dispatch(showNotification(content))
    };

    return(
       <div>
            {filteredAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                </div>
                </div>
            )}
        </div> 
    )
    
}

export default AnecdoteList