import React from 'react';

export const TextInput = () => {
    return (
        <input onChange={(event) => {console.log(event.target.value)}}></input>
    );
}
