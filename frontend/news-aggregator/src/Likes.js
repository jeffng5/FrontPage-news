import React, {useState} from 'react'
import {Helpers} from './helpers'
import './css/forum.css'

const Likes =( {comment}) =>{
    console.log(comment)
    const [likeCount, setLikeCount] = useState()
    
    async function getLikeCount() {
    const res = await Helpers.getPostLike(comment)
        console.log(res.thing[0].likes)
        setLikeCount(res.thing[0].likes)
    }

    getLikeCount()
    return (
    <h4 className='comment-card-1'>{likeCount}</h4>
)}



export default Likes