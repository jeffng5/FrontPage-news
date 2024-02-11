import React, { useState, useEffect } from 'react'
import "./semantic.css"
import { Helpers } from './helpers'
import ArticleCard from './ArticleCard'

const Forum = () => {

    const [state, setState] = useState([])

useEffect(()=> {
    getAllForumArticles();
},[])
    async function getAllForumArticles() {
        let res = await Helpers.getForum()
        const json = await res.json()
        console.log(typeof res)
        setState(json)
}
// getAllForumArticles()
console.log(state)
return (

<>
<h1 className = 'forum'>Welcome to the News Forum</h1>
<h3>Here: {state}</h3>
{/* {state.map(c=> (
    <ArticleCard title={c.title}
    description= {c.description}
    urlToImage= {c.urlToImage}
    author = {c.author}
    url = {c.url}/>
))} */}
</>
)
}
export default Forum