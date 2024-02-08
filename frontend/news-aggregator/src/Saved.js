import React, { useState, useEffect } from 'react'
import {Helpers} from "./helpers"
import ArticleCard from "./ArticleCard"

let username = localStorage.getItem('username')

//display archives 
const Saved = () => {

    const [articles, setArticles] = useState([])


    // useEffect(() =>{
    //     archiveResults()
    // }, [])

async function archiveResults() {

    console.log(username)
//helper function to query archives
    const resp = await Helpers.getArticles(username)
    console.log("I am here")
    console.log(resp)
// res not returning anything
    setArticles(resp)
  
}
archiveResults()
console.log(articles)
console.log(username)


return (
<>
     <h1>THIS IS THE ARCHIVE PAGE</h1>

{articles.map(c => (<ArticleCard title= {c.title}
    url = {c.url}
    description = {c.description}
    author = {c.author}/> ))
    }
</>


)
}





export default Saved;