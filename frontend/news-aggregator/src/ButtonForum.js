import React, { useState, useEffect } from 'react'
import './FrontPage.css'
import {Helpers} from "./helpers"
import myImage from "./penfeather.png"
import {useNavigate} from 'react-router-dom'


const ButtonForum = ({username, url, title, description, author, urlToImage}) => {
    console.log(title)
    const navigate = useNavigate()
    const [state, setState] = useState(null)
// useEffect(()=>{
//     handleArchive()
// }, []  )


    const handleForum = async() => {
        try {
            //using function to make backend API call to POST saved article
            const res = await Helpers.postForum(username,url,title, description,author, urlToImage)
            navigate('/forum')
            setState(res)
         
        }
        catch (e){
            console.log(e)
        }
    }
    console.log(state)

    return (
        <button className='forum' onClick={handleForum}><div><h6>Post to Forum</h6></div></button>
    )
    }

    export default ButtonForum