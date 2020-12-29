import React, { createContext, PropsWithChildren } from 'react'

export const myContext = createContext<any>({});

function Context(props: PropsWithChildren<any>) {
    return (
        <myContext.Provider value={1000}>{props.children}</myContext.Provider>
    )
}

export default Context
