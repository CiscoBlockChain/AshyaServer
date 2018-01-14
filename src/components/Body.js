import React from 'react'

const Body = ({addresses}) => (
    <div className="container">
        <h1 className="header">Addresses</h1>
        { addresses.map( (a) => 
            <p key={a}>{ a }</p>
          )}
    </div>
);

export default Body
