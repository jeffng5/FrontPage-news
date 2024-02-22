import React, {useState} from 'react'
import './css/semantic.css'
import {Helpers} from "./helpers"
import { FormInput, Form } from 'semantic-ui-react'
import { useNavigate, Link } from 'react-router-dom'


const SignUp = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState([])

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
        const res = await Helpers.signUpUser(formData.username, formData.password, formData.email);
        console.log(res)
       
        localStorage.setItem("res.token", res.token)
        localStorage.setItem("username", res.user)
        navigate('/users')
        return console.log("Sign in successful")
    
    }
    
    return (
        <>
        <h1 id='login-welcome'>Please SignUp</h1>
        <Form>
    <div className='sign-in'>
    <FormInput

  
      type='text'
      placeholder='username'
      id='username'
      name='username'
      onChange= {handleChange}
      value = {formData.username}
    /> 
   
    <FormInput
  
      type ='password'
      placeholder='password'
      id='password'
      name= 'password'
      onChange = {handleChange}
      value ={formData.password}
    />
       <FormInput
  
      type ='email'
      placeholder='email'
      id='email'
      name= 'email'
      onChange = {handleChange}
      value ={formData.email}
    />
    </div>
    <div className= 'log-in-form'>
      <Link to = "/users"><button id='log' onClick={SignUpUser}>Sign In</button></Link>
    </div>
  
  </Form>
        </>
    )
}


export default SignUp