import React, { useState, useEffect } from 'react'
import "./css/forum.css"
import { Helpers } from './helpers'
// import DateTime from 'react-datetime'


const Comment = ({id}) => {
  const username = localStorage.getItem('username')
  const [comment, setComment] = useState([])
  const [datetime, setDateTime] = useState(new Date())
  console.log(username)

// useEffect(() => {
//      addComment();
//    },[comment])


 async function addComment(e) {
    e.preventDefault();
    setComment(e.target.value)
    setDateTime(new Date())
    const res = await Helpers.postComment(username,  comment, id, datetime)
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