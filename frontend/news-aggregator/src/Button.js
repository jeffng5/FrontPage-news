import React, { useState, useEffect } from 'react'
import './FrontPage.css'
import {Helpers} from "./helpers"
import myImage from "./penfeather.png"

const Button = ({username, url, title, description, author}) => {

    const [archive, setArchive] = useState([])
    const [state, setState] = useState(null)
useEffect(()=>{
    handleArchive()
}, [setState]  )


    const handleArchive = async() => {
        try {
            //using function to make backend API call to POST saved article
            const res = await Helpers.saveArticle(username, url, title, description, author)
          setState(res)
          console.log(res)
        }
        catch (e){
            console.log(e)
        }
    }

if (!state)
    return (
        <button id = {title} className='archive' onClick={handleArchive}><img id= 'archive' src = {myImage} alt=''></img>Archive</button>
    )

else {
    return (
        <button id ={title} className='archived'>Archived</button>
    )
}
}

 







export default Button