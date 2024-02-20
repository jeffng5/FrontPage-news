import React, { useState } from 'react'
import "./css/forum.css"
import { Helpers } from './helpers'
import Comments from './Comments'


const Comment = ({id}) => {
  const username = localStorage.getItem('username')
  const [comment, setComment] = useState([])

 const addComment = (e) => {
        e.preventDefault();
       setComment(e.target.value)
       const res = Helpers.postComment(username, comment, id)
    console.log(res)
 }

 const handleChange= (e) => {
    e.preventDefault();
    setComment(e.target.value)
    console.log(comment)

 }
return (
    <>
<Comments id = {id} />
<form>

<textarea name='message' rows='5' cols='50' onChange={handleChange}>
    Type comment here...

</textarea>
</form>
<button onSubmit={addComment}>Add Comment</button>
</>
)
}
export default Comment