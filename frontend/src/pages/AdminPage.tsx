import axios from 'axios';
import React, { useEffect } from 'react'

function AdminPage() {
    useEffect(() => {
        axios.get('http://localhost:4000/users', {
            withCredentials: true
        })
        .then(res => {
            console.log(res);            
        })
        .catch(err => console.log(err));
    }, []);

    return (
        <div>
            Admin
        </div>
    )
}

export default AdminPage
