import React, { useState, useEffect } from 'react'
import "../css/FrontPage.css"
import "../css/semantic.css"
import { jwtDecode } from "jwt-decode"
import ColoredLine from "../SmallComponents/ColoredLine"
import { Link, useNavigate } from 'react-router-dom'
import UseApi from '../hooks/useApi'
import snoopy from './snoopy.jpg'

// holds bulk of search, many API calls, displays current date
const FrontPage = () => {

    let username = localStorage.getItem('username')
    function checkToken() {
        let token = localStorage.getItem('token')
        if (token) {
            const decode = jwtDecode(token)
            setUserLoggedIn(true)
            return decode
        }
        else {
            setUserLoggedIn(false)
        }
    }


    // states for all the topics
    const navigate = useNavigate()
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [dateTime, setDateTime] = useState(new Date())
    const [isLoading, setIsLoading] = useState(true)
    const date = dateTime.toLocaleDateString();

    useEffect(() => {
        console.log(userLoggedIn)
    }, [userLoggedIn])


    useEffect(() => {
        setDateTime(new Date());
        checkToken();

    }, []);

    async function loading() {
        setIsLoading(false)
   
    }
    setTimeout(loading, 2000)

    if (isLoading) { return (
    <>
    <h1 className='snoopy'>Fetching News...</h1><img src = {snoopy} alt ='snoopy'/> </>) }

    else {
        if (userLoggedIn && username) {

            return (

                <>
                    <div className='links'>
                        <Link to="/">Hi {username},</Link>
                        <Link to="/users">Preferences</Link>
                        <Link to="/users/frontpage">FrontPage</Link>
                        <Link to="/users/forum">Forum</Link>
                        <Link to="/users/archives">Archives</Link>
                        <Link to="/logout">Logout</Link>
                    </div>

                    <h1 className='title'>Your Front Page News </h1>
                    <h2 className='date'>{date}</h2>

                    <ColoredLine color="black" />

                    <UseApi />



                    <h2 className='closing'><Link to='/users'>Go back to Preferences Page</Link></h2>
                </>

            )
        }
        else {
            navigate('/')

        }
    }
}





export default FrontPage