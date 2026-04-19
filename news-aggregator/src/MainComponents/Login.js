import React, { useState } from "react";
import "../css/semantic.css";
import "../css/LoginPage.css";
import { FormInput, Form, Message } from "semantic-ui-react";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);
  const [errorState, setErrorState] = useState({
    visible: false,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  async function LoginUser(e) {
    e.preventDefault();
    try {
      if (!formData.username || !formData.password) {
        return setErrorState({
          visible: true,
          message: "Username or password cannot be blank",
        });
      }
      console.log("running loginUser");
      const res = await loginUser(formData.username, formData.password);
      console.log(res);

      if (res.token && res.user) {
        return navigate("/users");
      }

      if (!res.token || !res.user) {
        return navigate("/");
      } else {
        console.log("wrong username or password");
        return navigate("/error");
      }
    } catch (err) {
      console.log(err);
      const message = Array.isArray(err) ? err.join(" ") : String(err);
      setErrorState({ visible: true, message });
    }
  }

  console.log(formData.username);
  console.log(formData.password);

  return (
    <main className="login-page">
      <h1 id="login-welcome">Please Login</h1>

      <Form error={errorState.visible}>
        <div className="form-entry">
          <FormInput
            type="text"
            placeholder="username"
            id="username"
            name="username"
            onChange={handleChange}
            value={formData.username}
          />
        </div>
        <div className="form-entry">
          <FormInput
            type="password"
            placeholder="password"
            id="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
          />
        </div>
        {errorState.visible ? (
          <div className="form-entry login-page__error" role="alert">
            <Message
              error
              header="Login Error"
              content={errorState.message}
            />
          </div>
        ) : null}
        <div className="log-in-form-1 login-page__actions">
          <button type="button" className="preferences" onClick={LoginUser}>
            Log In
          </button>
        </div>
      </Form>
    </main>
  );
};

export default Login;
