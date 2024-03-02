import React from 'react'
import './css/App.css'
import { Link } from 'react-router-dom'

//welcome component on homepage
const Welcome = () => {

    return (
        <>
        <body>
        <h1 className='welcome'>Welcome to</h1> <p className= 'news-title'><b className = 'title'>YourFrontPageNews.com</b></p>

        <h2><div><b></b></div>
        <div className="intro">
            your curated articles of your news preferences</div> <div className='intro'>from the <b>top news publications</b></div></h2>

      
        <span id='login'>
        <Link to = "/login"><p className='top'>Login</p></Link>
        </span>
        <span id='login'>
        <Link to = "/signup"><p className='top-1'>Register</p></Link>
        </span>
         
    </body>
    </>
    )
}

export default Welcome