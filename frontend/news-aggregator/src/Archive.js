import React, { useState, useEffect } from 'react'
import './css/FrontPage.css'
import {Helpers} from "./helpers"
import myImage from './penfeather.png'



// let username = localStorage.getItem('username')
// button component to archive article takes in data from parent component
const Archive = ({username, url, title,description, author}) =>{

    const [activeButton, setActiveButton] = useState(true)
    const [state, setState] = useState([])
  
    
    async function handleArchive() {
        apiCall();
        
      
    }

    //apiCall thru helper function to post article into archive table
    async function apiCall() {
        try {
        setActiveButton(false);
        const res = await Helpers.saveArticle(username,url,title, description,author)
        setState(res)
        console.log(res)

    }   catch (e) {
        console.log(e)
    }}
console.log(state)
    return (
        <>

        <button className='archive' onClick={handleArchive} style={{backgroundColor: activeButton ? 'yellow' : 'grey' }}><img id= 'archive' src = {myImage} alt=''></img>Archive</button>


      
        </>
    )


}

export default Archive