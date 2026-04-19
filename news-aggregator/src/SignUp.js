import React, { useState } from "react";
import "./css/semantic.css";
import "./css/SignUpPage.css";
import { signUpUser } from "./api";
import { FormInput, Form } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  console.log(formData.username);
  console.log(formData.email);
  console.log(formData.password);

    async function SignUpUser(e) {
        e.preventDefault();
        try {
            if (!formData.username || !formData.password || !formData.email) {
            return navigate('/error')
           }
         

          let res = await signUpUser(formData.username, formData.password, formData.email);
        
          if (res.token && res.user){
            localStorage.setItem("token", res.token)
            localStorage.setItem("username", res.user)
            return navigate('/users')
          }
     

      if (res.token && res.user) {
        return navigate("/users");
      } else {
        return navigate("/error");
      }
    } catch (err) {
      console.log("sign up error");
      return navigate("/error");
    }
  }

  return (
    <main className="signup-page">
      <h1 id="login-welcome">Please SignUp</h1>
      <Form>
        <div className="sign-in">
          <FormInput
            type="text"
            placeholder="username"
            id="username"
            name="username"
            onChange={handleChange}
            value={formData.username}
          />

          <FormInput
            type="password"
            placeholder="password"
            id="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
          />
          <FormInput
            type="email"
            placeholder="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
          />
        </div>
        <div className="log-in-form">
          <button type="button" className="preferences" onClick={SignUpUser}>
            Sign In
          </button>
        </div>
      </Form>
    </main>
  );
};

export default SignUp;
