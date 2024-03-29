import React, { useState } from 'react'
import "./css/forum.css"
import { Helpers } from './helpers'



//component to add comment 
const Comment = ({id}) => {
  const username = localStorage.getItem('username')
  let forum_art_id = id
  const [comment, setComment] = useState([])
  const [datetime, setDateTime] = useState(new Date())
  const [addedClause, setAddedClaus] = useState([])

 

 
  async function addComment() {
    setDateTime(new Date())
    //helpers function to post comment
    const res = await Helpers.postComment(username,  comment, forum_art_id, datetime)
        .then(function (response) {
          setAddedClaus('comment has been added')})
        .catch(function (error) {
          console.log(error)
        })
    // note to user that comment has been added
  
    return (res, 'status OK')
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