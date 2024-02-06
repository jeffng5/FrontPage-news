import React, { useState } from 'react'
import './FrontPage.css'
import {Helpers} from "./helpers"
import myImage from './penfeather.png'

// button component to archive article takes in data from parent component
const Archive = ({username, url, title, description, author}) =>{

    const [state, setState] = useState(null)

    const handleArchive = async() => {
        try {
            //using function to make backend API call to POST saved article
            const res = await Helpers.saveArticle(username, url, title, description, author)
          setState(res)
        }
        catch (e){
            console.log(e)
        }
    }

console.log(state)
if (state) {
    return (
        <button className='archived'><img id= 'archive' src = {myImage} alt=''></img>Archived</button>
    )
}
if (!state){
return (
    <>
    <button className='archive' onClick={handleArchive}><img id= 'archive' src = {myImage} alt=''></img>Archive</button>
 
    </>
)

}
}



export default Archive