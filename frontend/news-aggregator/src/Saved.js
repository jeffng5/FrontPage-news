import React, { useState, useEffect } from 'react'
import {Helpers} from "./helpers"
import ForumArticleCard from "./ForumArticleCard"
import { Link } from 'react-router-dom'

let username = localStorage.getItem('username')

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

console.log(articles)
console.log(username)


return (
<>
<div className='links'>
        <Link to = ""><p>Hi {username},</p></Link>
        <Link to = "/users"><p>Preferences</p></Link>
        <Link to = "/users/frontpage"><p>FrontPage</p></Link>
        <Link to = "/users/forum"><p>Forum</p></Link>
        <Link to = "/users/archives"><p>Archives</p></Link>
        <Link to = "/logout"><p>Logout</p></Link>
   
        </div>
     <h1>THIS IS THE ARCHIVE PAGE</h1>



{articles.map(c => (<ForumArticleCard title= {c.title}
    url = {c.url}
    description = {c.description}
    author = {c.author}/> ))
    }


</>


)
}





export default Saved;