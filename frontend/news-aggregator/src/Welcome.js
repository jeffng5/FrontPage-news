import React from 'react'
import './App.css'
import Login from "./Login"
import SignUp from "./SignUp"

const Welcome = () => {

    return (
        <body>
        <h1 className='welcome'>Welcome to <p className= 'news-title'><b className = 'title'>YourFrontPageNews.com</b></p></h1>

        <h2><div><b></b></div>
        <div>
            your curated articles of your news preferences</div> <div>from the <b>top news publications</b></div></h2>
            
    <Login />
        <h1 className='or'>Or</h1>
    <SignUp />
    </body>)
}

export default Welcome