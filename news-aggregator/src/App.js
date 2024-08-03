import React from 'react'
import './css/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Welcome from './MainComponents/Welcome'
import Preferences from './MainComponents/Preferences'
import FrontPage from './MainComponents/FrontPage'
import Saved from './MainComponents/Saved'
import Forum from './MainComponents/Forum'
import Login from './MainComponents/Login'
import SignUp from './MainComponents/SignUp'
import Logout from './MainComponents/Logout'
import Error from './MainComponents/Error'


function App() {

  return (
  <>
  
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path = "/" exact element={<Welcome />}></Route>
        <Route path = "/users" exact element={<Preferences />}></Route>
        <Route path = "/users/frontpage" element={<FrontPage />}></Route>
        <Route path = "/users/archives" exact element= {<Saved />}></Route>
        <Route exact path = "/users/forum" element = {<Forum />}></Route>
        <Route path = '/login' exact element = {<Login />}></Route>
        <Route path = "/signup" exact element = {<SignUp />}></Route>
        <Route path = "/logout" exact element= {<Logout />}></Route>
        <Route path = '/error' exact element = {<Error />}></Route>
      
      </Routes>
      </BrowserRouter>




</div> 

    </>
  );

}

export default App;
