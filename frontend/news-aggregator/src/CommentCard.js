import React, { useState } from 'react'
import './css/forum.css'
import { Helpers } from './helpers'
import Likes from './Likes'
 

const CommentCard = ({comment, username, datetime}) => {
    
    const [addLike, setAddLike] = useState(0)

    async function addLikes() {
    
        await Helpers.postLike(comment)
        
        const res = await Helpers.getPostLike(comment)
        console.log(res.thing[0].likes)
        setAddLike(res.thing[0].likes)
     
       
       
    }

    return (
        <>
        <h4 className='comment-card-whole'>
        <h4 className= 'comment-card'>"{comment}" <h4 className = 'user'>-{username} on {datetime.slice(0,10)}, {datetime.slice(11,19)}</h4></h4> 
        
        <h4 className= 'comment-card'>
        <button className='like-button' onClick={addLikes}><img className= 'like' src='../like.png'></img><Likes comment = {comment}/></button>
        </h4>
        </h4>
        </>
    )
}


export default CommentCard
