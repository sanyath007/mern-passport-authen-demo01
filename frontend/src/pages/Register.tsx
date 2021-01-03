import React, { useState } from 'react'
import axios from 'axios'

function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleRegister = () => {
        axios.post('http://localhost:4000/register', {
            name,
            email,
            password
        })
        .then(res => {
            if (res.data === 'success') {
                window.location.href = "/login"
            }            
        })
        .catch(err => console.log(err));
    }

    return (
        <div>
            <h1>Register</h1>
            <input
                type="text"
                placeholder="Enter your name"
                onChange={ e => setName(e.target.value) }
            />
            <input
                type="text"
                placeholder="Enter your email"
                onChange={ e => setEmail(e.target.value) }
            />
            <input
                type="password"
                placeholder="Enter your password"
                onChange={ e => setPassword(e.target.value) }
            />
            <button onClick={ handleRegister }>Register</button>
        </div>
    )
}

export default Register
