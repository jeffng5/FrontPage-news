import React, { useState, useEffect } from 'react'
import {Helpers} from "./helpers"
import { jwtDecode } from "jwt-decode"
import ArchiveArticleCard from "./ArchiveArticleCard"
import { Link } from 'react-router-dom'

let username = localStorage.getItem('username')
let token = localStorage.getItem('res.token')
const decode = jwtDecode(token)

//display archives 
const Saved = () => {

    const [articles, setArticles] = useState([])


    useEffect(() =>{
        archiveResults()
    }, [])

async function archiveResults() {

    console.log(username)
//helper function to query archives
  
    const res = await Helpers.getArticles(username)

    console.log(res)
// res not returning anything
    setArticles(res.articles)

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