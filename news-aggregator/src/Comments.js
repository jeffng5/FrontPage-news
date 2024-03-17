import React, { useState, useEffect } from 'react'
import "./css/forum.css"
import { Helpers } from './helpers'
import CommentCard from './Cards/CommentCard'

//get all comments from db
const Comments = ({ id }) => {

    const [state, setState] = useState([])

    useEffect(() => {
        displayComments();
    }, [])


    async function displayComments() {
        const res = await Helpers.getAllComments(id)
        if (Array.isArray(res.comments)) {
            setState(res.comments)
        }
    }

    return (
        <>{state.map(c => (
            <CommentCard
                id={c.id}
                comment={c.comment}
                username={c.username}
                datetime={c.datetime}
            />

        ))}</>



    )

}





export default Comments