import React from 'react'
import './css/forum.css'


const CommentCard = ({comment, username}) => {

    return (
        <>
        <h4 className= 'comment-card'>{comment} -{username}</h4>
        </>
    )
}


export default CommentCard
