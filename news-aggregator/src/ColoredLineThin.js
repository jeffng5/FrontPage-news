import React from 'react'


// divider line between articles
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