import React, { useState, useEffect, Component } from 'react'
import { Form, FormTextArea, FormButton } from 'semantic-ui-react'
import "./css/semantic.css"
import './css/forum.css'
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
    let res = await Helpers.getForum()

    setState(res.forumArticles)
}


return (

<>
<div className='links'>
        <Link to = ""><p>Hi {username},</p></Link>
        <Link to = "/users"><p>Preferences</p></Link>
        <Link to = "/users/forum"><p>Forum</p></Link>
        <Link to = "/users/archives"><p>Archives</p></Link>
        <Link to = "/logout"><p>Logout</p></Link>
   
        </div>
<h1 className = 'forum'>Welcome to the News Forum</h1>

{state.map(c=> (
    <ForumArticleCard title={c.title}
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