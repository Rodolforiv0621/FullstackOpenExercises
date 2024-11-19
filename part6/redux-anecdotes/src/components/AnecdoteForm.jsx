import { useDispatch } from "react-redux";
import { addNewAnecdote } from "../reducers/anecdoteReducer";
// import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () =>{
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = "";
        dispatch(addNewAnecdote(content))
    }

    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='anecdote' /></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm