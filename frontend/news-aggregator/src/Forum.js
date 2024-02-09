import React, { useState } from 'react'
import "./semantic.css"
import {Helpers} from './helpers'
import ArticleCard from './ArticleCard'

const Forum = () => {

    const [state, setState] = useState([])

    async function getAllForumArticles() {
        let res = await Helpers.getForum()
        console.log(res)
        console.log(typeof res)
        setState(res.data)

}
getAllForumArticles()
console.log(state)
return (

<>
<h1 className = 'forum'>Welcome to the News Forum</h1>

{state.map(c=> (
    <ArticleCard title={c.title}
    description= {c.description}
    urlToImage= {c.urlToImage}
    author = {c.author}
    url = {c.url}/>
))}
</>
)
}
export default Forum