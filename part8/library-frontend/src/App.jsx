import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Recommend from "./components/Recommend";
import { useApolloClient } from "@apollo/client";


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

      <Books show={page === "books"} newBookAdded={newBookAdded} resetNewBookAdded= {() => setNewBookAdded(false)}/>

      <NewBook show={page === "add"} setNewBookAdded={setNewBookAdded}/>

      <Recommend show={page === "recommend"} />
      
      <Login show={page === "login"} setToken={setToken} setShow={setPage}/>
      
    </div>
  );
};

export default App;
