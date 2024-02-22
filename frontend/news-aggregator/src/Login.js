import React, {useState} from 'react'
import './css/semantic.css'
import { FormInput, Form } from 'semantic-ui-react'
import {Helpers} from "./helpers"
import { useNavigate, Link } from 'react-router-dom'



const Login = () => {
    //redirect to /users onCLick
    const navigate = useNavigate()
    const [formData, setFormData] = useState([])
    

    //handles input
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(formData => ({...formData,[name]: value }))
    }
    // takes in username, password and makes backend call to route for validation
    async function LoginUser(e) {
        e.preventDefault();
        const res = await Helpers.loginUser(formData.username, formData.password);
        console.log(res)
        localStorage.setItem("res.token", res.token)
        localStorage.setItem('username', res.user)
        
        navigate('/users')
        return "TOKEN ADDED!"
    }
    console.log(formData)
    return (
        <>
        <h1 id='login-welcome'>Please Login</h1>
        {/* <form>
            <div className= "log-in-form">
            <input id= "username" type= "text" name='username'placeholder= "username"
            onChange={handleChange} value={formData.username}></input>
            </div>
            <div className= "log-in-form">
            <input id= "password" type= "password" name= 'password' onChange={handleChange} placeholder= "password" value={formData.password}></input>
            </div>
            <div className= 'log-in-form'>
            <Link to = '/users'><button id='log' onClick={LoginUser}>Log In</button></Link> 
            </div>
        </form> */}
          <Form>
          <div className='form-entry'>
    <FormInput
     
      // error={{ content: 'Please enter your username', pointing: 'below' }}
      // label='Username'
      type='text'
      placeholder='username'
      id='username'
      name='username'
      onChange= {handleChange}
      value = {formData.username}
    /> </div>
     <div className='form-entry'>
    <FormInput
      // error={{ content : 'Please enter your password', pointing: 'below' }}
      // label="Password"
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