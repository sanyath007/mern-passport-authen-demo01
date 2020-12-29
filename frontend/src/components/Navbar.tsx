import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { myContext } from '../pages/Context';

function Navbar() {
    const ctx = useContext(myContext);
    
    return (
        <div className="NavContainer">
            <Link to="/">Home</Link>

            {ctx ? (
                <>
                    { ctx.isAdmin ? <Link to="/admin">Admin</Link> : null }
                    <Link to="/profile">Profile</Link>
                    <Link to="/logout">Logout</Link>
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
