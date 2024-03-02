import React, { useState, useEffect } from 'react'
import { jwtDecode } from "jwt-decode" 
import './css/forum.css'
import { useNavigate } from 'react-router-dom'
import { Helpers } from './helpers'
import ForumArticleCard from './ForumArticleCard'
import { Link } from 'react-router-dom'

let token = localStorage.getItem('res.token')
const decode = jwtDecode(token)

//forum component
const Forum = () => {
    const navigate = useNavigate()
    let username = localStorage.getItem('username')
    const [state, setState] = useState([])
    const [loading, isLoading] = useState(true)

    useEffect(()=> {
        getForumArticles();
        isLoading(false)
    },[])
    
    // helper function to get all articles in forum table
    async function getForumArticles() {
        let res = await Helpers.getForum();
        setState(res.forumArticles);
    }


if (loading) {
        return (
        <h2>Page does not exist</h2>
        )
    }    
if (decode)
{
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


}
export default Forum