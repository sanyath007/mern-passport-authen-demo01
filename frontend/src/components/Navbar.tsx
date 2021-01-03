import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { myContext } from '../pages/Context';
import axios from 'axios';

function Navbar() {
    const ctx = useContext(myContext);
    
    const logout = () => {
        axios.get('http://localhost:4000/logout', {
            withCredentials: true
        })
        .then(res => {           
            if (res.data === "success") {
                window.location.href = "/";
            }
        })
        .catch(err => console.log(err));
    };

    return (
        <div className="NavContainer">
            <Link to="/">Home</Link>

            {ctx ? (
                <>
                    { ctx?.isAdmin ? <Link to="/admin">Admin</Link> : null }
                    <Link to="/profile">Profile</Link>
                    <a onClick={logout}>Logout</a>
                </>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}            
        </div>
    )
}

export default Navbar
