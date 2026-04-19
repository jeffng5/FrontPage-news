import React from 'react'
import { Link } from 'react-router-dom'
import '../css/semantic.css'


const Error = () => {

return (
<main className="error-page-wrap">
<nav className="links" aria-label="Auth">
  <Link to="/">Home</Link>
  <Link to="/signup">Register</Link>
  <Link to="/login">Login</Link>
</nav>
<h3 className= 'error-page'> Username taken or incomplete/wrong information entered. Please try again.</h3>
<h3><Link to = '/signup' >Return to SignUp</Link></h3>
<h3><Link to = '/'>Homepage</Link></h3>
</main>
)
}



export default Error
