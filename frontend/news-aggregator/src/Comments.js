import React, { useState, useEffect } from 'react'
import "./css/forum.css"
import { Helpers } from './helpers'
import CommentCard from './CommentCard'


const Comments = ({id}) => {

    const [state, setState] = useState([])

    useEffect(() => {
        displayComments();
    }, [])
    
    async function displayComments() {
        const res = await Helpers.getAllComments(id)
        console.log(res, "label")
        console.log(res.comments, 'WHy not?')
        setState(res.comments)
}
        console.log(state)

return (
 <>{state.map(c =>( 
    <CommentCard
    comment = {c.comment}
    username = {c.username}
    datetime= {c.datetime}
/>

))}</> 



)

}





export default Comments