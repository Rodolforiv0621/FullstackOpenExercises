import { useDispatch, useSelector } from "react-redux";
import {  addLike } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteList = () =>{
    const dispatch = useDispatch()
    const anecdotes = useSelector((state) => state.anecdotes);
    const filter = useSelector(state => state.filter)

    const filteredAnecdotes = anecdotes.filter(anecdotes => anecdotes.content.toLowerCase().includes(filter.toLowerCase()))

    const vote = (anecdote) => {
      dispatch(addLike(anecdote));
      dispatch(showNotification(anecdote.content, 5000))
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
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
                </div>
            )}
        </div> 
    )
    
}

export default AnecdoteList