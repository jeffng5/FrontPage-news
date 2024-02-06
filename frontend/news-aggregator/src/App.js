import React from 'react'
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Welcome from "./Welcome"
import Preferences from "./Preferences"
import FrontPage from "./FrontPage"
import Saved from "./Saved"
import Logout from "./Logout"

function App() {

  return (
  <>
  
    <div className="App">
 
      <BrowserRouter>
      <Routes>
        <Route path = "/" exact element={<Welcome />}></Route>
        <Route path = "/users" exact element={<Preferences />}></Route>
        <Route path = "/users/preferences" exact element={<FrontPage />}></Route>
        <Route path = "/users/archives" exact element= {<Saved />}></Route>
        <Route path = "/logout" exact element= {<Logout />}></Route>




      </Routes>
      </BrowserRouter>



</div>

    </>
  );

}

export default App;
