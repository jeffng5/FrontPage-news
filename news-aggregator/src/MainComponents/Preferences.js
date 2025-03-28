import React, { useState, useEffect } from 'react'
import { jwtDecode } from "jwt-decode"
import "../css/semantic.css"
import { FormField, Checkbox } from 'semantic-ui-react'
import { Link, useNavigate } from 'react-router-dom'




const Preferences = () => {


  function checkToken() {
    let token = localStorage.getItem('token')
    if (token) {
      const decode = jwtDecode(token)
      setUserLoggedIn(true)
      return decode
    }
    else {
      setUserLoggedIn(false)
    }
  }

  const navigate = useNavigate()
  let user = localStorage.getItem('username')
  let pref = localStorage.getItem('preferences')
  let wildCard = localStorage.getItem('freePreferences')

  console.log(pref)

  const [showWildCard, setShowWildCard] = useState(wildCard)
  const [prefs, setPrefs] = useState(pref)
  const [error, setError] = useState("")
  const [searchTopics, setSearchTopics] = useState([])
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [termState, setTermState] = useState("anything")

  useEffect(() => {

    checkToken();
    throwError();
  }, [pref])

  useEffect(() => {
    console.log(userLoggedIn)
  }, [userLoggedIn])

  // function to intake search term and save to localStorage
  const handleForm = (e) => {

    let wildCard = []
    console.log(e.target.value)
    wildCard.push(e.target.value)
    localStorage.setItem('freePreferences', wildCard)
    setShowWildCard(wildCard)
    setTermState("anything")
    

  }


  // capture the checkbox input
  function handleChange(e) {
    // protected with username/sign in
    if (user) {

      e.preventDefault();
      //checks if checkbox is checked
      if (e.target.checked === true) {
        setSearchTopics([...searchTopics, e.target.value])
      }
      //handles if the box is unchecked
      if (e.target.checked === false) {
         
        setSearchTopics(searchTopics.filter(topic => topic !== e.target.value))
      }
      console.log(searchTopics)
    }
  }
  // function to catch if user selects more than 5 topics and defaults back to 0
  function throwError() {
    if (searchTopics.length > 5) {
      setError("Please select at most 5 topics")
      localStorage.setItem('preferences', "")
      

    } else {
      setError("")
    }
  }


 // function to ingest the topics and search term into localStorage 
  const handleSave = () => {
    localStorage.setItem('preferences', searchTopics)
    setPrefs(searchTopics)
    localStorage.setItem('freePreferences', wildCard)
    setShowWildCard(wildCard)
    setTermState("anything")
   

  }

  console.log(prefs)
    
  //////////////////////////////// CHECKBOX FORM ////////////////////////////////

  if (userLoggedIn && user) {
    
    return (
      <>


        <div className='links'>
          <Link to="">Hi {user},</Link>
          <Link to="/users">Preferences</Link>
          <Link to='/users/frontpage'>FrontPage</Link>
          <Link to="/users/forum">Forum</Link>

          <Link to="/users/archives">Archives</Link>
          <Link to="/logout">Logout</Link>

        </div>
        <h1 className='prefs'>News Topic Preferences</h1>

        <h3 className='topics'> Your current Topics Are:</h3> <h3 className='color'>{pref}</h3>
        <h4>{error}</h4>
        <h3 className='topics'> Please Choose One (Up to 5): </h3>
        <form>
          <h5 className='selection'>
            <h5>
              <FormField
                control={Checkbox}
                label={<label className='choices'>Australia</label>}
                id='Australia' name='Australia' value="Australia" onChange={handleChange}
              />
            </h5>
            <h5>
              <FormField
                control={Checkbox}
                label={<label>Asia</label>}
                id='Asia' name='Asia' value="Asia" onChange={handleChange}
              />
            </h5>
            <h5>
              <FormField
                control={Checkbox}
                label={<label>Business</label>}
                id='Business' name='Business' value="Business" onChange={handleChange}
              />
            </h5>
            <h5>
              <FormField
                control={Checkbox}
                label={<label>Entertainment</label>}
                id='Entertainment' name='Entertainment' value="Entertainment" onChange={handleChange}
              />
            </h5>
            <h5>
              <FormField
                control={Checkbox}
                label={<label>Food</label>}
                id='Food' name='Food' value="Food" onChange={handleChange}
              />
            </h5>
            <h5>
              <FormField
                control={Checkbox}
                label={<label>General</label>}
                id='General' name='General' value="General" onChange={handleChange}
              />
            </h5>
            <h5>
              <FormField
                control={Checkbox}
                label={<label>U.K.</label>}
                id='U.K' name='U.K' value="U.K." onChange={handleChange}
              />
            </h5>

            <h5>
              <FormField
                control={Checkbox}
                label={<label>Science</label>}
                id='Science' name='Science' value="Science" onChange={handleChange}
              />
            </h5>
            <h5>
              <FormField
                control={Checkbox}
                label={<label>Sports</label>}
                id='Sports' name='Sports' value="Sports" onChange={handleChange}
              />
            </h5>
            <h5>
              <FormField
                control={Checkbox}
                label={<label>Technology</label>}
                id='Technology' name='Technology' value="Technology" onChange={handleChange}
              />
            </h5>
            <h5>
              <FormField
                control={Checkbox}
                label={<label>U.S.</label>}
                id='US' name='US' value="US" onChange={handleChange}
              />
            </h5>
          </h5>
          <h2 className='separator'>or</h2>
            
          <FormField><span className='anything'> <label for="Anything">Most popular articles by search term <h3 className='color'>{showWildCard}</h3></label>
            <input type='text' id='Anything' name='anything' placeholder={termState} onChange={handleForm} /></span>
          </FormField>
          
          <div className='button-preferences'>
            <button className='preferences' type='button' value='Save Preferences'
              onClick={handleSave}>Save Preferences</button>
          </div>
          <div className="button-preferences">
            <Link to='frontpage'><button className='save'>See Front Page News</button></Link>
          </div>

        </form>
      </>

    )
  }
  else {
    navigate('/')

  }



}







export default Preferences