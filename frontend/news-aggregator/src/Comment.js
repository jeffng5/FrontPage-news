import React, { useState, useEffect } from 'react'
import "./css/forum.css"
import { Helpers } from './helpers'
import Comments from './Comments'


const Comment = ({id}) => {
  const username = localStorage.getItem('username')
  const [comment, setComment] = useState([])
  console.log(username)

//   useEffect(() => {
//     addComment();
//   },[addComment])


 async function addComment(e) {
    e.preventDefault();
    setComment(e.target.value)
    const res = await Helpers.postComment(username, comment, id)
    console.log(res)
 }

 const handleChange= (e) => {
    e.preventDefault();
    setComment(e.target.value)
    console.log(comment)

 }
return (
    <>

<form>

<textarea placeholder = 'Type comment here...' name='message' rows='5' cols='50' onChange={handleChange}>
    

</textarea>
</form>
<button className= 'add-comment' onClick={addComment}>Add Comment</button>
</>
)
}
export default Comment