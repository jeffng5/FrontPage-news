import React, { useState, useEffect } from 'react'
import { Helpers } from "../helpers"
import { jwtDecode } from "jwt-decode"
import ArchiveArticleCard from "../Cards/ArchiveArticleCard"
import { Link, useNavigate } from 'react-router-dom'

//display archives 
const Saved = () => {
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

  const navigate = useNavigate()
  const [articles, setArticles] = useState([])
  const [userLoggedIn, setUserLoggedIn] = useState(() =>
    Boolean(localStorage.getItem('token'))
  )

  useEffect(() => {
    archiveResults()
    checkToken()
  }, [])

  async function archiveResults() {
    try {
      const res = await Helpers.getArticles(username)
      setArticles(Array.isArray(res?.articles) ? res.articles : [])
    } catch (e) {
      console.error(e)
      setArticles([])
    }
  }

  if (userLoggedIn && username) {
    return (
      <>
        <nav className="links" aria-label="Main">
          <Link to="">Hi {username},</Link>
          <Link to="/users">Preferences</Link>
          <Link to="/users/frontpage">FrontPage</Link>
          <Link to="/users/forum">Forum</Link>
          <Link to="/users/archives">Archives</Link>
          <Link to="/logout">Logout</Link>

        </nav>
        <h1 className='archive-page'>YOUR ARCHIVE PAGE</h1>

        <section className="front-page__articles">
          {articles.map((c, i) => (
            <ArchiveArticleCard
              key={c.url || `archive-${i}`}
              title={c.title}
              url={c.url}
              description={c.description}
              author={c.author}
            />
          ))}
        </section>
      </>
    )
  }

  navigate('/')
  return null
}

export default Saved;
