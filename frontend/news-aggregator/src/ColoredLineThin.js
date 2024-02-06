import React from 'react'



const ColoredLineThin = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 3
        }}
    />
);


export default ColoredLineThin