import React, { useState } from 'react'
import '../css/semantic.css'
import { Helpers } from "../helpers"
import { FormInput, Form } from 'semantic-ui-react'
import { useNavigate, Link } from 'react-router-dom'


const SignUp = () => {

  const navigate = useNavigate()
  const [formData, setFormData] = useState([])


  // handle change to intake formData
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(formData => ({ ...formData, [name]: value }))
  }

  //makes API call to backend to post register data and redirect to users page.

  async function SignUpUser(e) {
    e.preventDefault();
    try {
      if (!formData.username || !formData.password || !formData.email) {
        return navigate('/error')
      }


      let res = await Helpers.signUpUser(formData.username, formData.password, formData.email);

      if (res.token && res.user) {
        // localStorage.setItem("token", res.token)

        return navigate('/users')
      }


      else {
        return navigate('/error')
      }
    }
    catch (err) {
      console.log('sign up error')
      return navigate('/error')
    }
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
            onChange={handleChange}
            value={formData.username}
          />

          <FormInput

            type='password'
            placeholder='password'
            id='password'
            name='password'
            onChange={handleChange}
            value={formData.password}
          />
          <FormInput

            type='email'
            placeholder='email'
            id='email'
            name='email'
            onChange={handleChange}
            value={formData.email}
          />
        </div>
        <div className='log-in-form'>
          <button id='log' onClick={SignUpUser}>Sign In</button>
        </div>

      </Form>
    </>
  )
}


export default SignUp