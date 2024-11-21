import { useSelector } from 'react-redux'
import usersService from '../services/users'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Users = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        usersService.getAll().then(data => setUsers(data))
    }, [])
    
    
    // const names = users.map(user => user.blogs.length)
    return (
        <div>  
            <h2>Users</h2>
            <span style={ { paddingRight: 50 } }></span><span>Blogs Created</span>
            {users.map(user => (
                <div key={user.id}><span style={ { paddingRight: 10 } } ><Link to={`/users/${user.id}`}>{user.name}</Link></span><span>{user.blogs.length}</span></div>
            ))}
        </div>
    )
}

export default Users