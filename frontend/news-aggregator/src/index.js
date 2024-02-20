import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Welcome from './Welcome'
import Preferences from './Preferences'
import FrontPage from './FrontPage'
import Saved from './Saved'
import Forum from './Forum'
import Login from './Login'
import SignUp from './SignUp'
import Logout from './Logout'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   
    <BrowserRouter>
      <Routes>
        <Route path = "/" exact element={<Welcome />}></Route>
        <Route path = "/users" exact element={<Preferences />}></Route>
        <Route path = "/users/frontpage" exact element={<FrontPage />}></Route>
        <Route path = "/users/archives" exact element= {<Saved />}></Route>
        <Route path = "/users/forum" exact element = {<Forum />}></Route>
        <Route path = '/login' exact element = {<Login />}></Route>
        <Route path = "/signup" exact element = {<SignUp />}></Route>
        <Route path = "/logout" exact element= {<Logout />}></Route>




      </Routes>
      </BrowserRouter>
      <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
