import React, { useState, useEffect } from 'react'
import { jwtDecode } from "jwt-decode"
import '../css/forum.css'
import { useNavigate } from 'react-router-dom'
import { Helpers } from '../helpers'
import ForumArticleCard from '../Cards/ForumArticleCard'
import { Link } from 'react-router-dom'
import snoopy from './snoopy.jpg'



//forum component
const Forum = () => {
    let user = localStorage.getItem('username')

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

    const navigate = useNavigate()
    let username = localStorage.getItem('username')
    const [state, setState] = useState([])
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getForumArticles();
        checkToken();
    }, [])

    // helper function to get all articles in forum table
    async function getForumArticles() {
        let res = await Helpers.getForum();
        setState(res.forumArticles);
    }
    console.log(state)

    async function loading() {
        setIsLoading(false)

    }
    setTimeout(loading, 2000)

    if (isLoading) { return (
        <>
        <h1 className='snoopy'>Fetching News...</h1><img src = {snoopy} alt ='snoopy'/> </>) }

    else {
        if (userLoggedIn && user) {
            return (

                <>
                    <div className='links'>
                        <Link to="">Hi {username},</Link>
                        <Link to="/users">Preferences</Link>
                        <Link to="/users/frontpage">FrontPage</Link>
                        <Link to="/users/forum">Forum</Link>
                        <Link to="/users/archives">Archives</Link>
                        <Link to="/logout">Logout</Link>
                    </div>
                    <h1 id='forum'>Welcome to the News Forum</h1>

                    {state.map(c => (
                        <ForumArticleCard
                            key={c.id}
                            title={c.title}
                            description={c.summary}
                            urlToImage={c.media}
                            author={c.author}
                            url={c.url}
                            likes={c.likes}
                            id={c.id}
                        />

                    ))}

                    <div className='external-link'>
                        <Link to='/users/frontpage'>Go back to your Front Page</Link>
                    </div>
                </>
            )
        }

        else {
            navigate('/')

        }

    }

}
export default Forum