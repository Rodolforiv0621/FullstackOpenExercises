import { useLazyQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import { useState, useEffect} from "react"

const Books = (props) => {
  const [genre, setGenre] = useState("all")
  const [getBooks, {loading, data, error, refetch}] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    getBooks({ variables: { genre: genre === 'all' ? null : genre }})
  }, [getBooks, genre])

  if (!props.show) {
    return null
  }

  const getGenres = async (e) => {
    
    const selectedGenre = e.target.value
    setGenre(selectedGenre)
    console.log(selectedGenre)
    refetch({variables: { genre: selectedGenre === 'all' ? null : selectedGenre}})
    .catch((err) => {
      console.error("Refetch error:", err);
    });
  }

  if (loading){
    return <div>loading...</div>
  }
  if (error){
    return <div>Failed book information request</div>
  }
  
  const books = data ? data.allBooks : []

  return (
    <div>
      <h2>books</h2>
      <p>in genre {genre}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={getGenres} value={"refactoring"}>refactoring</button>
        <button onClick={getGenres} value={"agile"}>agile</button>
        <button onClick={getGenres} value={"patterns"}>patterns</button>
        <button onClick={getGenres} value={"design"}>design</button>
        <button onClick={getGenres} value={"crime"}>crime</button>
        <button onClick={getGenres} value={"classic"}>classic</button>
        <button onClick={getGenres} value={"all"}>all genres</button>
      </div>
    </div>
  )
}

export default Books
