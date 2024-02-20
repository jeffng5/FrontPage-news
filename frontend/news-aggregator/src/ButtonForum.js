import React, { useState} from 'react'
import './css/FrontPage.css'
import {Helpers} from "./helpers"



const ButtonForum = ({username, url, title, description, author, urlToImage}) => {
    console.log(title)
  
    const [state, setState] = useState([])
    const [buttonColor, setButtonColor] = useState(true)


    const handleForum = async() => {
        try {
            setButtonColor(false)
            //using function to make backend API call to POST saved article
            const res = await Helpers.postForum(username,url,title, description,author, urlToImage)
            setState(res)
        
        }
        catch (e){
            console.log(e)
        }
    }
    console.log(state)

    return (
        <button className='forum' onClick={handleForum} style={{backgroundColor: buttonColor ? 'aquamarine' : 'grey'  }}><h6 id='button'>Post to Forum</h6></button>
    )
    }

    export default ButtonForum