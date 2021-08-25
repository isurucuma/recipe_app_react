import React from 'react'

export default function Ingredients({name, amount}) {
    return (
        <>
            <span>{name}</span>
            <span>-  {amount}</span>
        </>
    )
}
