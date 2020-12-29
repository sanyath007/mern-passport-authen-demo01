import React, { createContext, PropsWithChildren, useState, useEffect } from 'react'
import axios from 'axios'

export const myContext = createContext<any>({});

function Context(props: PropsWithChildren<any>) {
    const [user, setUser] = useState<any>()

    useEffect(() => {
        axios.get("http://localhost:4000/user", { withCredentials: true })
        .then(res => setUser(res.data))
        .catch(err => console.log(err))        
    }, [])
    return (
        <myContext.Provider value={user}>{props.children}</myContext.Provider>
    )
}

export default Context
