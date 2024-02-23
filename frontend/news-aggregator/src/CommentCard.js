import React from 'react'
import './css/forum.css'


const CommentCard = ({comment, username, datetime}) => {

    return (
        <>
        <h4 className='comment-card-whole'>
        <h4 className= 'comment-card'>"{comment}" -{username} on {datetime.slice(0,10)}, {datetime.slice(11,19)}</h4>
        </h4>
        </>
    )
}


export default CommentCard
