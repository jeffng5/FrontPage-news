import React, { useState, useEffect } from 'react'
import "./css/forum.css"
import { Helpers } from './helpers'
import CommentCard from './CommentCard'

//get all comments from db
const Comments = ({id}) => {

    const [state, setState] = useState([])

    useEffect(() => {
        displayComments();
    }, [])
    
    
    async function displayComments() {
        const res = await Helpers.getAllComments(id)
        setState(res.comments)
}
        console.log(state)

return (
 <>{state.map(c =>( 
    <CommentCard
    id = {c.id}
    comment = {c.comment}
    username = {c.username}
    datetime= {c.datetime}
/>

))}</> 



)

}





export default Comments