import React, { useState } from 'react'
import "./css/forum.css"
import { Helpers } from './helpers'


const Comments = ({id}) => {

    const [state, setState] = useState([])

function displayComments() {
   const res = Helpers.getAllComments(id)
   setState(res.data)
}

displayComments()

return (
    {state}
)

}





export default Comments