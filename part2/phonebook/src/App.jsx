import { useState, useEffect} from "react";
import noteService from './services/notes'



const DisplayPhonebook = ({persons, handleDelete}) =>{
  return(
    <div>
      {
        persons.map((person) => (<div key={person.name}>{person.name} {person.number} <button onClick={()=>handleDelete(person.id, person.name)}>delete</button></div>))
      }
    </div>
  )
}

const Message = ({errorMessage}) =>{
  if (errorMessage === null) {
    return null;
  }
  const messageStyle = {
    color: errorMessage.color,
    backgroundColor: 'grey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  return <div style={messageStyle}>{errorMessage.message}</div>;
}

const Header = ({header}) =>{
  return <h2>{header}</h2>
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 }
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() =>{
      
    noteService.getAll().then((data) => {
        setPersons(data);
      })
      .catch((error) =>{
         console.log("Error fetching data: ", error)
         setPersons([{ name: "Arto Hellas", number: "040-123456", id: 1 }]);
      });
  },[])
  
  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) =>{
    setNewPhone(event.target.value)
  }

  const handleDelete = (id, name) =>{
    if(window.confirm(`Delete ${name} ?`)){
      noteService.deletePerson(id)
      .catch(error => console.log("error deleting request: ", error))
      setPersons(persons.filter(person=>person.id !== id))

      setErrorMessage({
        message: `${name} has been removed from server`,
        color: "red",
      });
      setTimeout(() => {
        setErrorMessage(null);
      }, 4000);
    }
    
  }

  const handleSearchChange = (event) =>{
    setSearch(event.target.value);
  }

  const addPerson = (event) =>{
    event.preventDefault()
    const index = persons.findIndex((person) => person.name === newName);
    if (index !== -1 && window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
      noteService
        .update(persons[index].id, { ...persons[index], number: newPhone })
        .then((data) =>{
            setPersons(persons.map((person) => (person.name !== newName ? person : data)))
        })
        .catch(() => {
          setErrorMessage({message: `Information of ${persons[index].name} has already been removed from server`, color: 'red'})
          setTimeout(()=>{
            setErrorMessage(null)
          }, 4000)
        })
      
    }
    if(index === -1){
      const newPerson = {name: newName, number: newPhone}
      noteService.create(newPerson)
        .then(data=>{
          setPersons(persons.concat(data))
          setErrorMessage({message: `Added ${newPerson.name}`, color: "green"})
          setTimeout(() =>{
            setErrorMessage(null)
          }, 4000)
        })
        .catch(error =>{
          console.log("Error posting to server: ", error)
        })
      
    }
    setNewName("")
    setNewPhone("")
  }

  const filteredList = persons.filter(person =>{
    return person.name.toLowerCase().includes(search.toLowerCase())
  }
  )

  return (
    <div>
      <Header header={"phonebook"} />
      <Message errorMessage={errorMessage} />
      <input value={search} onChange={handleSearchChange} />
      <Header header={"add a new"} />
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newPhone} onChange={handlePhoneChange}></input>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <Header header={"Numbers"} />
      {search === "" ? (
        <DisplayPhonebook persons={persons} handleDelete={handleDelete} />
      ) : (
        <DisplayPhonebook persons={filteredList} handleDelete={handleDelete} />
      )}
    </div>
  );
};

export default App;
