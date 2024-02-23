import React, { useState, useEffect } from 'react'
// import "./css/semantic.css"
// import './css/forum.css'
import { Helpers } from './helpers'
import ForumArticleCard from './ForumArticleCard'
import { Link } from 'react-router-dom'


let username = localStorage.getItem('username')
const Forum = () => {

    const [state, setState] = useState([])

    useEffect(()=> {
        getForumArticles();
    },[])
    
    async function getForumArticles() {
        let res = await Helpers.getForum();
        setState(res.forumArticles);
    }


return (

<>
<div className='links'>
        <Link to = "">Hi {username},</Link>
        <Link to = "/users">Preferences</Link>
        <Link to = '/users/frontpage'>FrontPage</Link>
        <Link to = "/users/forum">Forum</Link>
        <Link to = "/users/archives">Archives</Link>
        <Link to = "/logout">Logout</Link>
   
        </div>
<h1 className = 'forum'>Welcome to the News Forum</h1>

{state.map(c=> (
    <ForumArticleCard 
        key={c.id}
        title={c.title}
        description= {c.description}
        urlToImage= {c.urlToImage}
        author = {c.author}
        url = {c.url}
        likes= {c.likes}
        id = {c.id}
    />
   
))}

<div>
<Link to = '/users/frontpage'>Go back to your Front Page</Link>
</div>
</>
)
}
export default Forum