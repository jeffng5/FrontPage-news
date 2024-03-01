import React, { useState, useEffect } from 'react'
import { jwtDecode } from "jwt-decode" 
import './css/forum.css'
import { Helpers } from './helpers'
import { Navigate } from 'react-router-dom'
import ForumArticleCard from './ForumArticleCard'
import { Link } from 'react-router-dom'



//forum component
const Forum = () => {
    
    let username = localStorage.getItem('username')
    let token = localStorage.getItem('res.token')
    const decode = jwtDecode(token)

    const [state, setState] = useState([])

    useEffect(()=> {
        getForumArticles();
    },[])
    
    // helper function to get all articles in forum table
    async function getForumArticles() {
        let res = await Helpers.getForum();
        setState(res.forumArticles);
    }

// if (!decode) {
//         return <Navigate to = '/users' />
//     }

// if (decode)
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
<h1 id = 'forum'>Welcome to the News Forum</h1>

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

<div className='external-link'>
<Link to = '/users/frontpage'>Go back to your Front Page</Link>
</div>
</>
)

}
export default Forum