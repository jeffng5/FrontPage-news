import React, { useState } from 'react'
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
    console.log("I am here")    
    const res = await Helpers.getArticles(username)
    console.log('after helper function')
    console.log(res)
// res not returning anything
    setArticles(res.data)
    console.log("after setting state")
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