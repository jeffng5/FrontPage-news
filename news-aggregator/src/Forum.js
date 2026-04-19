import React, { useState, useEffect } from 'react'
import { jwtDecode }  from "jwt-decode" 
import './css/forum.css'
import { useNavigate } from 'react-router-dom'
import { getForum } from "./api";
import ForumArticleCard from './ForumArticleCard'
import { Link } from 'react-router-dom'



//forum component
const Forum = () => {
    let user = localStorage.getItem('username')

    function checkToken() {
        let token = localStorage.getItem('token')
        if (token) {
           const decode = jwtDecode(token)
          setUserLoggedIn(true)
        return decode
        }
        else {
          setUserLoggedIn(false)
        }
    }

    const navigate = useNavigate()
    let username = localStorage.getItem('username')
    const [state, setState] = useState([])
    const [userLoggedIn, setUserLoggedIn] = useState(false)

    useEffect(()=> {
        getForumArticles();
        checkToken()
    },[])
    
    // helper function to get all articles in forum table
    async function getForumArticles() {
        try {
            const res = await getForum();
            // fetch api returns the JSON body directly; not axios { data: ... }
            setState(Array.isArray(res?.forumArticles) ? res.forumArticles : []);
        } catch (e) {
            console.error(e);
            setState([]);
        }
    }

if (userLoggedIn && user)
{
return (
<main className="forum-page">
<div className='links'>
        <Link to="/">Hi {username},</Link>
        <Link to = "/users">Preferences</Link>
        <Link to = '/users/frontpage'>FrontPage</Link>
        <Link to = "/users/forum">Forum</Link>
        <Link to = "/users/archives">Archives</Link>
        <Link to = "/logout">Logout</Link>
    </div>
<h1 id = 'forum'>Welcome to the News Forum</h1>

{(Array.isArray(state) ? state : []).map((c) => (
    <ForumArticleCard 
        key={c.id}
        title={c.title}
        description= {c.description}
        urlToImage={c.urlToImage}
        author = {c.author}
        url = {c.url}
        likes= {c.likes}
        id = {c.id}
    />
   
))}

<div className='external-link'>
<Link to = '/users/frontpage'>Go back to your Front Page</Link>
</div>
</main>
)
}

else {
  navigate('/')

}


}
export default Forum