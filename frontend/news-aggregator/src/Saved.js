import React, { useState, useEffect } from 'react'
import {Helpers} from "./helpers"
import ArticleCard from "./ArticleCard"

let username = localStorage.getItem('username')
let blah = localStorage.getItem('res')
console.log(blah, "here")

//display archives 
const Saved = () => {
    let initialState= []
    const [display, setDisplay] = useState(initialState)

// useEffect to  
    useEffect(() =>{
        archiveResults()
    }, [])

    const archiveResults = async() => {
    try{
    console.log(username)
//helper function to query archives
    const res = await Helpers.getArticles(username)
    console.log(res)
// res not returning anything
    setDisplay(res)
    }
    catch (e) {
        console.log(e)
    }
}
console.log(display)

return (

    // <h1>THIS IS THE ARCHIVE PAGE</h1>

[...display].map(c =>(<ArticleCard title= {c.title}
    url = {c.url}
    description = {c.description}
    author = {c.author}/> ))

)


}





export default Saved;