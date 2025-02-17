import { useQuery } from "@apollo/client"
import { useState } from "react"
import { ALL_BOOKS } from "../queries"

const Recommend = (props) => {
    const [favoriteGenre, setFavoriteGenre] = useState('patterns')
    
    const result = useQuery(ALL_BOOKS, {variables: {genre: favoriteGenre}})
    if(!props.show){
        return null
    }

    const books = result.data.allBooks
    return (
        <div>
            <h2>recommendations</h2>
            <p>books in your favorite genre <b>{favoriteGenre}</b></p>
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
        </div>
    )
}

export default Recommend