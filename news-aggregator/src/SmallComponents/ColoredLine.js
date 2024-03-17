import React from 'react'


// divider line between title and rst of articles
const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 5
        }}
    />
);


export default ColoredLine