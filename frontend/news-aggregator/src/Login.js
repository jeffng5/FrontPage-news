import React, {useState} from 'react'
import './App.css'
import './semantic.css'
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
        navigate('/users')
        return res
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
    <div>
    <FormInput

      error={{ content: 'Please enter your username', pointing: 'below' }}
      fluid
      label='Username'
      type='text'
      placeholder='username'
      id='username'
      name='username'
      onChange= {handleChange}
      value = {formData.username}
    /> 
    <FormInput
      error={{ content : 'Please enter your password', pointing: 'below' }}
      fluid
      label="Password"
      type ='password'
      placeholder='password'
      id='password'
      name= 'password'
      onChange = {handleChange}
      value ={formData.password}
    />
    </div>
    <div className= 'log-in-form'>
      <Link to = '/users'><button id='log' onClick={LoginUser}>Log In</button></Link> 
    </div>
  
  </Form>
        </>
    )
}


export default Login