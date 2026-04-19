import React, { useState, useEffect } from 'react'
import { getArticles } from "./api";
import { jwtDecode } from "jwt-decode"
import ArchiveArticleCard from "./Cards/ArchiveArticleCard"
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
    const [userLoggedIn, setUserLoggedIn] = useState(false)


    useEffect(() =>{
      async function archiveResults() {

    //helper function to query archives
      
        const data = await getArticles(username);
        setArticles(Array.isArray(data?.articles) ? data.articles : []);
      
    
    }
    
        archiveResults()
        checkToken()
    }, [])




if (userLoggedIn && username){
return (
<main className="saved-page">
<nav className="links" aria-label="Main">
        <Link to="/">Hi {username},</Link>
        <Link to = "/users">Preferences</Link>
        <Link to = "/users/frontpage">FrontPage</Link>
        <Link to = "/users/forum">Forum</Link>
        <Link to = "/users/archives">Archives</Link>
        <Link to = "/logout">Logout</Link>
   
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
</main>
)
}
else {
  navigate('/')

}

}





export default Saved;