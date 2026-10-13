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
  const storedSearch = localStorage.getItem('freePreferences')

  const [prefs, setPrefs] = useState(pref || '')
  const [error, setError] = useState("")
  const [searchTopics, setSearchTopics] = useState(() =>
    (pref || '').split(',').map(topic => topic.trim()).filter(Boolean)
  )
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [termState, setTermState] = useState(
    storedSearch == null || storedSearch === 'null' ? '' : storedSearch
  )

  useEffect(() => {

    checkToken();
  }, [])

  useEffect(() => {
    console.log(userLoggedIn)
  }, [userLoggedIn])

  // function to intake search term and save to localStorage
  const handleForm = (e) => {

    const term = e.target.value
    localStorage.setItem('freePreferences', term.trim())
    setTermState(term)
    

  }


  // capture the checkbox input
  function handleChange(e, { value, checked }) {
    if (!user) return
    if (checked && !searchTopics.includes(value) && searchTopics.length >= 5) {
      setError('Please select at most 5 topics')
      return
    }
    setError('')
    setSearchTopics(previous => checked
      ? previous.includes(value) ? previous : [...previous, value]
      : previous.filter(topic => topic !== value))
  }


 // function to ingest the topics and search term into localStorage 
  const handleSave = () => {
    const topics = searchTopics.join(',')
    localStorage.setItem('preferences', topics)
    setPrefs(topics)
    localStorage.setItem('freePreferences', termState.trim())
   

  }

    
  //////////////////////////////// CHECKBOX FORM ////////////////////////////////

  if (userLoggedIn && user) {
    
    return (
      <>


        <nav className="links" aria-label="Main">
          <Link to="">Hi {user},</Link>
          <Link to="/users">Preferences</Link>
          <Link to='/users/frontpage' state={{ topics: searchTopics.join(',') }}>FrontPage</Link>
          <Link to="/users/forum">Forum</Link>

          <Link to="/users/archives">Archives</Link>
          <Link to="/logout">Logout</Link>

        </nav>
        <h1 className='prefs'>News Topic Preferences</h1>

        <h3 className='topics'> Your current Topics Are:</h3> <h3 className='color'>{prefs}</h3>
        <h4>{error}</h4>
        <h3 className='topics'> Please Choose One (Up to 5): </h3>
        <form>
          <div
            className="selection preferences-topics-grid"
            role="group"
            aria-label="News topics"
          >
            <h5>
              <FormField
                control={Checkbox}
                label={<label className='choices'>Australia</label>}
                id='Australia' name='Australia' value="Australia" checked={searchTopics.includes('Australia')} onChange={handleChange}
              />
            </h5>
            <h5>
              <FormField
                control={Checkbox}
                label={<label>Asia</label>}
                id='Asia' name='Asia' value="Asia" checked={searchTopics.includes('Asia')} onChange={handleChange}
              />
            </h5>
            <h5>
              <FormField
                control={Checkbox}
                label={<label>Business</label>}
                id='Business' name='Business' value="Business" checked={searchTopics.includes('Business')} onChange={handleChange}
              />
            </h5>
            <h5>
              <FormField
                control={Checkbox}
                label={<label>Entertainment</label>}
                id='Entertainment' name='Entertainment' value="Entertainment" checked={searchTopics.includes('Entertainment')} onChange={handleChange}
              />
            </h5>
            <h5>
              <FormField
                control={Checkbox}
                label={<label>Food</label>}
                id='Food' name='Food' value="Food" checked={searchTopics.includes('Food')} onChange={handleChange}
              />
            </h5>
            <h5>
              <FormField
                control={Checkbox}
                label={<label>General</label>}
                id='General' name='General' value="General" checked={searchTopics.includes('General')} onChange={handleChange}
              />
            </h5>
            <h5>
              <FormField
                control={Checkbox}
                label={<label>Health</label>}
                id='Health' name='Health' value="Health" checked={searchTopics.includes('Health')} onChange={handleChange}
              />
            </h5>
            <h5>
              <FormField
                control={Checkbox}
                label={<label>U.K.</label>}
                id='U.K' name='U.K' value="U.K." checked={searchTopics.includes('U.K.')} onChange={handleChange}
              />
            </h5>

            <h5>
              <FormField
                control={Checkbox}
                label={<label>Science</label>}
                id='Science' name='Science' value="Science" checked={searchTopics.includes('Science')} onChange={handleChange}
              />
            </h5>
            <h5>
              <FormField
                control={Checkbox}
                label={<label>Sports</label>}
                id='Sports' name='Sports' value="Sports" checked={searchTopics.includes('Sports')} onChange={handleChange}
              />
            </h5>
            <h5>
              <FormField
                control={Checkbox}
                label={<label>Technology</label>}
                id='Technology' name='Technology' value="Technology" checked={searchTopics.includes('Technology')} onChange={handleChange}
              />
            </h5>
            <h5>
              <FormField
                control={Checkbox}
                label={<label>U.S.</label>}
                id='US' name='US' value="US" checked={searchTopics.includes('US')} onChange={handleChange}
              />
            </h5>
          </div>
          <h2 className='separator'>or</h2>
            
          <FormField><span className='anything'> <label htmlFor="Anything">Most popular articles by search term <h3 className='color'>{termState}</h3></label>
            <input type='text' id='Anything' name='anything' placeholder='Search term' value={termState} onChange={handleForm} /></span>
          </FormField>
          
          <div className='button-preferences'>
            <button className='preferences' type='button' value='Save Preferences'
              onClick={handleSave}>Save Preferences</button>
          </div>
          <div className="button-preferences">
            <Link to='frontpage' state={{ topics: searchTopics.join(',') }}><button type='button' className='save'>See Front Page News</button></Link>
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
