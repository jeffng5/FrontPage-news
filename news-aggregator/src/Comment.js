import React, { useState, useEffect } from 'react'
import "./css/forum.css"
import { Helpers } from './helpers'



//component to add comment 
const Comment = ({id}) => {
  const username = localStorage.getItem('username')
  const [comment, setComment] = useState([])
  const [datetime, setDateTime] = useState(new Date())
  const [addedClause, setAddedClaus] = useState([])

  console.log(username)




  async function addComment(e) {
    e.preventDefault();
    setComment(e.target.value);
    setDateTime(new Date())
    //helpers function to post comment
    const res = await Helpers.postComment(username,  comment, id, datetime)
    console.log(res)
    // note to user that comment has been added
    setAddedClaus('comment has been added')
    
 }
//handleChange function
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