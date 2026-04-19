import React from 'react'
import "../css/App.css"
import "../css/semantic.css"
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
        <main className="logout-page">
            <nav className="links" aria-label="Auth">
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Register</Link>
            </nav>
            <h2>Thanks for Visiting! <p className='username'>{username}</p></h2>

            <h2><Link to='/'>Sign In at Homepage</Link></h2>
        </main>

    )

}


export default Logout