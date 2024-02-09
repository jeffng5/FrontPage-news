import React, { useState } from 'react'
import './FrontPage.css'
import {Helpers} from "./helpers"
import myImage from './penfeather.png'


// button component to archive article takes in data from parent component
const Archive = ({username, title, description, url, author}) =>{

    const [activeButton, setActiveButton] = useState(true)
 
    async function apiCall() {
        const res = await Helpers.saveArticle(username,url,title, description,author)
        alert("Submitted to archive")
        console.log(res)

    }
 
    async function handleArchive() {
        setActiveButton(!activeButton);
        apiCall();
    }

    return (
        <button className='archive' onClick={handleArchive} style={{backgroundColor: activeButton ? 'yellow' : 'grey' }}><img id= 'archive' src = {myImage} alt=''></img>Archive</button>
    )
        

}

export default Archive