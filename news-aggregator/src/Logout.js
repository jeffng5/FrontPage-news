import React from 'react'
import "./css/App.css"
import { Link } from 'react-router-dom'


const Logout = () => {

    const username = localStorage.getItem('username')
    async function logOutUser() {
        //removing username bc its used for access to many routes
        const result1 = localStorage.removeItem('res.token')
        const result = localStorage.removeItem('username')
        return result
    } 
        //set Timeout to allow username to be displayed before popping localStorage 
    setTimeout(logOutUser, 2000)

    return (
        <>
        <h2>Thanks for Visiting! <p className='username'>{username}</p></h2>
        
        <h2><Link to = '/'>Sign In at Homepage</Link></h2>
        </>
    
    )

}


export default Logout