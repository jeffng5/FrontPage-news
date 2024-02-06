import React, {useState} from 'react'
import './App.css'
import {Helpers} from "./helpers"
import { useNavigate } from 'react-router-dom'


const SignUp = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState("")

// handle change to intake formData
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(formData => ({...formData,[name]: value }))
    }
    console.log(formData.username)
    console.log(formData.email)

//makes API call to backend to post register data and redirect to users page.
    async function SignUpUser(e) {
        e.preventDefault();
        const res = await Helpers.signUpUser(formData.username, formData.password, formData.email)
        console.log(res)
        navigate('/users')
    
    }
    
    return (
        <>
        <h1 id='login-welcome'>Please SignUp</h1>
        <form>
            <div className= "log-in-form">
            <input id= "username" type= "text" name='username'placeholder= "username"
            onChange={handleChange} value={formData.username}></input>
            </div>
            <div className= "log-in-form">
            <input id= "password" type= "text" name= 'password' onChange={handleChange} placeholder= "password" value={formData.password}></input>
            </div>
            <div className= "log-in-form">
            <input id= "email" type= "text" name= 'email' onChange={handleChange} placeholder= "email" value={formData.email}></input>
            </div>

    
            <div className= 'log-in-form'>
            <button id='log' onClick={SignUpUser}>SignUp</button>
            </div>
        </form>
        </>
    )
}


export default SignUp