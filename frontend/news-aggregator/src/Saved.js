import React, { useState, useEffect } from 'react'
import {Helpers} from "./helpers"
import { jwtDecode } from "jwt-decode"
import ArchiveArticleCard from "./ArchiveArticleCard"
import { Link, useNavigate } from 'react-router-dom'

let username = localStorage.getItem('username')
let token = localStorage.getItem('res.token')
const decode = jwtDecode(token)

//display archives 
const Saved = () => {
    const navigate = useNavigate()
    const [articles, setArticles] = useState([])
    const [loading, isLoading] = useState(true)


    useEffect(() =>{
        archiveResults()
        isLoading(false)
    }, [])

async function archiveResults() {

    console.log(username)
//helper function to query archives
  
    const res = await Helpers.getArticles(username)

    console.log(res)
// res not returning anything
    setArticles(res.articles)
    isLoading(false)

}

if (loading) {
    return(
    <h2>Page does not exist</h2>
    )
}



if (decode)
return (
<>
<div className='links'>
        <Link to = "">Hi {username},</Link>
        <Link to = "/users">Preferences</Link>
        <Link to = "/users/frontpage">FrontPage</Link>
        <Link to = "/users/forum">Forum</Link>
        <Link to = "/users/archives">Archives</Link>
        <Link to = "/logout">Logout</Link>
   
        </div>
     <h1 className='archive-page'>YOUR ARCHIVE PAGE</h1>

{articles.map(c => (<ArchiveArticleCard title= {c.title}
    url = {c.url}
    description = {c.description}
    author = {c.author}/> ))
    }
</>
)

}





export default Saved;