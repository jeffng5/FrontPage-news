import React, { useState } from 'react'
import './css/FrontPage.css'
import { jwtDecode } from "jwt-decode"
import {Helpers} from "./helpers"
import { Navigate } from 'react-router-dom'
import myImage from './penfeather.png'


let token = localStorage.getItem('res.token')
const decode = jwtDecode(token)

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
     

    }   catch (e) {
        console.log(e)
    }}

// if (!decode)   {
//         return <Navigate to = '/users' />
//     }    
if (decode)
    return (
        <>

        <button className='archive' onClick={handleArchive} style={{backgroundColor: activeButton ? 'yellow' : 'grey' }}><img id= 'archive' src = {myImage} alt=''></img>Archive</button>


      
        </>
    )



}

export default Archive