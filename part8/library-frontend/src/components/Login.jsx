import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";
import { useEffect } from "react";

const Login = ({setToken, show, setShow}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            console.log(error.graphQLErrors.map(e => e.message).join('\n'))
        }
    })

    useEffect(() => {
        if(result.data){
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('library-user-token', token)
            setShow('authors')
        }
    }, [result.data])

    if(!show){
        return null
    }

    const submit = async(event) => {
        event.preventDefault()

        login({ variables: {username, password}})
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={submit}>
                <div>
                    username
                    <input
                        value={username}
                        onChange={({target}) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        value={password}
                        onChange={({target}) => setPassword(target.value)}
                        type="password"
                        />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default Login