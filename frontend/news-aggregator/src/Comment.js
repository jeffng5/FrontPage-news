import React, { useState, useEffect } from 'react'
import "./css/forum.css"
import { Helpers } from './helpers'



const Comment = ({id}) => {
  const username = localStorage.getItem('username')
  const [comment, setComment] = useState([])
  const [datetime, setDateTime] = useState(new Date())
  const [addedClause, setAddedClaus] = useState([])
  console.log(username)


  async function addComment(e) {
    e.preventDefault();
    setComment(e.target.value)
    setDateTime(new Date())
    const res = await Helpers.postComment(username,  comment, id, datetime)
    console.log(res)
    setAddedClaus('comment has been added')
    
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
<button className= 'add-comment' onClick={addComment}>Add Comment</button><h4>{addedClause}</h4>
</>
)
}
export default Comment