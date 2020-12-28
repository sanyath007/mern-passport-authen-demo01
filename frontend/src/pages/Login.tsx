import React, { useState } from 'react'
import axios from 'axios'

function Login() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleLogin = () => {
        axios.post('http://localhost:4000/login', {
            email, 
            password
        }, {
            withCredentials: true
        }).then(res => {
            console.log(res.data)
        }).catch(err => {
            console.log(err.response)
        })
    }

    const getUser = () => {
        axios.get('http://localhost:4000/user', {
            withCredentials: true
        }).then(res => {
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <h1>Login</h1>
            <input
                type="text"
                placeholder="email"
                onChange={ e => setEmail(e.target.value) }
            />
            <input
                type="password"
                placeholder="password"
                onChange={ e => setPassword(e.target.value) }
            />
            <button onClick={ handleLogin }>Login</button>
            <button onClick={ getUser }>Get User Thats Logged In</button>
        </div>
    )
}

export default Login
