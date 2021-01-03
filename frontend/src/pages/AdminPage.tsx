import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import { myContext } from './Context';

function AdminPage() {
    const ctx = useContext(myContext);
    const [data, setData] = useState<any>()
    const [selectedUser, setSelectedUser] = useState<string>()

    useEffect(() => {
        axios.get('http://localhost:4000/users', {
            withCredentials: true
        })
        .then((res: any) => {
            setData(res.data.filter((user: any) => user.email !== ctx.email ));            
        })
        .catch(err => console.log(err));
    }, []);

    if (!data) return null;

    const handleDeleteUser = () => {
        axios.delete('http://localhost:4000/user/' + selectedUser, {
            withCredentials: true
        })
        .then(res => {
            console.log(res);            
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
            <h1>Admin</h1>

            <select name="deleteUser" id="deleteUser" onChange={ e => setSelectedUser(e.target.value) }>
                {
                    data.map((item: any) => <option value={item._id} key={item._id}>{item.email}</option>)
                }
            </select> <button onClick={ handleDeleteUser }>Delete</button>
        </div>
    )
}

export default AdminPage
