import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Recommend from "./components/Recommend";
import { useApolloClient, useQuery, useMutation, useSubscription} from "@apollo/client";
import { ALL_BOOKS, BOOK_ADDED } from "./queries";



export const updateCache = (cache, query, addedBook) => {

  
  
  const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter((item)=> {
      let k = item.title
      return seen.has(k) ? false: seen.add(k)
    })
  }

  cache.updateQuery(query, (data) => {
    if (!data || !data.allBooks){
      return { allbooks: [addedBook]}
    }
    return {
      allBooks: uniqByTitle(data.allBooks.concat(addedBook))
    }
  })
  
}

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [newBookAdded, setNewBookAdded] = useState(false)
  const client =  useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage("authors")
  }
  
  // Does it go here???

  useSubscription(BOOK_ADDED, {
    onData: ({data, client}) => {
      const bookAdded = data.data.bookAdded
      alert(`${bookAdded.title} added`)
      updateCache(client.cache, {query: ALL_BOOKS, variables: {genre: null} }, bookAdded)
      
      bookAdded.genres.forEach(genre => {
        updateCache(client.cache, {query: ALL_BOOKS, variables: { genre}}, bookAdded)
      })
    }
  })

  return (
    <div>
      <div>
       <button onClick={() => setPage("authors")}>authors</button>
          <button onClick={() => setPage("books")}>books</button>
      {
        token ? (
          <>
         <button onClick={() => setPage("add")}>add book</button>
         <button onClick={() => setPage("recommend")}>recommend</button>
         <button onClick={logout}>logout</button>
         </>
        ) :
        (
          <button onClick={() => setPage("login")}>login</button>
        )
      }
      </div>
      <Authors show={page === "authors"} token={token}/>

      <Books show={page === "books"}/>

      <NewBook show={page === "add"}/>

      <Recommend show={page === "recommend"} />
      
      <Login show={page === "login"} setToken={setToken} setShow={setPage}/>
      
    </div>
  );
};

export default App;
