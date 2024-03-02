import React, { useState, useEffect } from 'react'
import {Helpers} from "./helpers"
import { jwtDecode } from "jwt-decode"
import ArchiveArticleCard from "./ArchiveArticleCard"
import { Link, useNavigate } from 'react-router-dom'

let username = localStorage.getItem('username')
console.log(username)
//display archives 
const Saved = () => {

    function checkToken() {
        let token = localStorage.getItem('res.token')
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
    const [articles, setArticles] = useState([])
    const [userLoggedIn, setUserLoggedIn] = useState(false)


    useEffect(() =>{
        archiveResults()
        checkToken()
    }, [])

async function archiveResults() {

    console.log(username)
//helper function to query archives
  
    const res = await Helpers.getArticles(username)

    console.log(res)
// res not returning anything
    setArticles(res.articles)
  

}



if (userLoggedIn){
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
else {
  navigate('/')

}

}





export default Saved;