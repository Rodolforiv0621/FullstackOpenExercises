import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
import { useState } from "react";

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);

  const [editAuthor] = useMutation(EDIT_AUTHOR, {refetchQueries: [{query: ALL_AUTHORS}],
    onError: (error) => {
    console.log(error.graphQLErrors.map(e => e.message).join('\n'))
  }})

  const [birthyear, setBirthyear] = useState('')
  const [name, setName] = useState('')

  if (!props.show) {
    return null
  }
  if(result.loading){
    return <div>loading...</div>
  }
  if(result.error){
    return <div>Failed</div>
  }
  const authors = result.data.allAuthors

  const submit = async (event) => {
    event.preventDefault()
    console.log("Submitting:", { name, birthyear: parseInt(birthyear, 10) });
    // console.log(name, birthyear)
    editAuthor({ variables: {name, setBornTo: parseInt(birthyear, 10)}})
    
    setBirthyear('')
    setName('')
  }
  
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set Birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          {/* <input
            value={name}
            onChange={({target}) => setName(target.value)}
          /> */}
          <select value={name} onChange={({target}) => setName(target.value)}>
            <option value="">Select an Author</option>
            {authors.map((a) => (
              <option key={a.id} value={a.name}>{a.name}</option>
            ))}
          </select>
          </div>
          <div>
            born
          <input
            value={birthyear}
            onChange={({target}) => setBirthyear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
