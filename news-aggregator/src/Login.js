import React, {useState} from 'react'
import './css/semantic.css'
import { FormInput, Form } from 'semantic-ui-react'
import {Helpers} from "./helpers"
import { useNavigate, Link } from 'react-router-dom'



const Login = () => {
    //redirect to /users onCLick
    const navigate = useNavigate()
    const [formData, setFormData] = useState([])
    // const [errorRes, setErrorRes] = useState(false)

    //handles input
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(formData => ({...formData,[name]: value }))
    }
    // takes in username, password and makes backend call to route for validation
    async function LoginUser(e) {
        e.preventDefault();
        try {
          if (!formData.username || !formData.password) {
            navigate('/error')
          }
          const res = await Helpers.loginUser(formData.username, formData.password);    
         
        
          if (res.token && res.user){
            localStorage.setItem("res.token", res.token)
            localStorage.setItem('username', res.user)
            navigate('/users')
        
          }
     
        // if (!res.token || !res.user) {
        //   navigate('/')
        // }
        else {
          console.log('wrong username or password')
          navigate('/error')
        }
      }
      catch (err) {
        console.log('catch error. Username and/or password do not match')
        navigate('/error')
      }
    }
     console.log(formData.username)
     console.log(formData.password)


    return (
        <>
    
        <h1 id='login-welcome'>Please Login</h1>
      
          <Form>
          <div className='form-entry'>
    <FormInput
  
      type='text'
      placeholder='username'
      id='username'
      name='username'
      onChange= {handleChange}
      value = {formData.username}
    /> </div>
     <div className='form-entry'>
    <FormInput
 
      type ='password'
      placeholder='password'
      id='password'
      name= 'password'
      onChange = {handleChange}
      value ={formData.password}
    />
    </div>
    <div className='log-in-form-1'>
      <Link to = '/users'><button className='preferences' onClick={LoginUser}>Log In</button></Link> 
    </div>
  
  </Form>
        </>
    )
    }



export default Login