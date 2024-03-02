import React from 'react'
import { Link } from 'react-router-dom'
import './css/semantic.css'


const Error = () => {

return (
<>

<h3 className= 'error-page'> Username taken or incomplete information. Please try again.</h3>
<h3><Link to = '/signup' >Return to SignUp</Link></h3>
<h3><Link to = '/'>Homepage</Link></h3>
</>
)
}



export default Error
