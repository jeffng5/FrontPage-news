import React, {useState} from 'react'
import {Helpers} from './helpers'
import './css/forum.css'

//component to fetch like data from comments table
const Likes =( {comment}) =>{
    console.log(comment)
    const [likeCount, setLikeCount] = useState()
    // API call to backend to fetch amt of likes per comment
    async function getLikeCount() {
    const res = await Helpers.getPostLike(comment)
     
        setLikeCount(res.thing[0].likes)
    }

    getLikeCount()
    return (
    <h4 className='comment-card-1'>{likeCount}</h4>
)}



export default Likes