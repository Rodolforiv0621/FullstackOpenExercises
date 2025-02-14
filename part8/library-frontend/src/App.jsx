import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import { useApolloClient } from "@apollo/client";


const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
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
         <button onClick={logout}>logout</button>
         </>
        ) :
        (
          <button onClick={() => setPage("login")}>login</button>
        )
      }
      </div>
      <Authors show={page === "authors"} token={token}/>

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />
      
      <Login show={page === "login"} setToken={setToken} setShow={setPage}/>
      
    </div>
  );
};

export default App;
