import React, { useState, useEffect } from 'react'
import { jwtDecode } from "jwt-decode"
import "./semantic.css"
import { FormField, Checkbox, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

let token = localStorage.getItem('res.token')
console.log(token)
const pl = jwtDecode(token)
let user = localStorage.getItem('username')
console.log(user)


const Preferences = () => {
  
    let pref = localStorage.getItem('preferences')
    const searchTopics=[]

    const initialState = pref
    const [prefs, setPrefs] = useState(initialState)

useEffect(()=>{
    setPrefs(pref)
    setPrefs(initialState)
}, []
)

// function to intake search term and save to localStorage
const handleForm = (e) => {

        let wildCard=[]
        console.log(e.target.value)
        wildCard.push(e.target.value)
        localStorage.setItem('freePreferences', wildCard)
    }

// capture the checkbox input
function handleChange(e) {
 // protected with username/sign in
    if (user) {
        console.log(e.target.checked)
        console.log(e.target.value)
    //checks if checkbox is checked
        if (e.target.checked === true) {
        //pushes value of checkbox into empty array
            searchTopics.push(e.target.value)
        }
        //handles if the box is unchecked
        if (e.target.checked === false) {
            // trying to get index of unchecked if in array 
            const index = searchTopics.indexOf(e.target.value);
            //splicing off element by index (the false checked item)
            searchTopics.splice(index, 1);
        }
            console.log(searchTopics)
}           // setting searchTopics to localStorage
            
        if (searchTopics.length >= 0) {
        localStorage.setItem('preferences', searchTopics)
        }
    
            //error handle if searchTopics is >5 or <1
            if (searchTopics.length > 5) {
                throw Error("You must select between 1 - 5 topics.")}
     
    }

console.log(localStorage.getItem('preferences'))
const wildCard = localStorage.getItem('freePreferences')




// protecting route
if (token)
//////////////////////////////// CHECKBOX FORM ////////////////////////////////
    return (
        <body>
        
     
        <div className='links'>
        <Link to = ""><p>Hi {user},</p></Link>
        <Link to = "/users"><p>Preferences</p></Link>

        <Link to = "/users/forum"><p>Forum</p></Link>
        
        <Link to = "/users/archives"><p>Archives</p></Link>
      
        <Link to = "/logout"><p>Logout</p></Link>
   
        </div>
        <h1 className='prefs'>News Topic Preferences</h1> 
     
        <h3 className='topics'> Your current Topics Are: <h3 className='color'>{prefs}</h3></h3>
        
        <h3 className='topics'> Please Choose One (Up to 5): </h3>

<form>
    <h5>
<FormField
      control={Checkbox}
      label={<label className='choices'>Australia</label>}
      id = 'Australia' name= 'Australia' value = "Australia" onChange={handleChange}
    />
    </h5>
    <h5>
    <FormField
      control={Checkbox}
      label={<label>Asia</label>}
      id = 'Asia' name= 'Asia' value = "Asia" onChange={handleChange}   
    />
    </h5>
    <h5>
  <FormField
      control={Checkbox}
      label={<label>Business</label>}
      id = 'Business' name= 'Business' value = "Business" onChange={handleChange}   
    />
    </h5>
    <h5>
    <FormField
      control={Checkbox}
      label={<label>Entertainment</label>}
      id = 'Entertainment' name= 'Entertainment' value = "Entertainment" onChange={handleChange}   
    />
    </h5>
    <h5>
  <FormField
      control={Checkbox}
      label={<label>General</label>}
      id = 'General' name= 'General' value = "General" onChange={handleChange}   
    />
    </h5>
    <h5>
  <FormField
      control={Checkbox}
      label={<label>U.K.</label>}
      id = 'U.K' name= 'U.K' value = "U.K." onChange={handleChange}   
    />
    </h5>
    <h5>
   <FormField
      control={Checkbox}
      label={<label>Health</label>}
      id = 'Health' name= 'Health' value = "Health" onChange={handleChange}   
    />
    </h5>
    <h5>
  <FormField
      control={Checkbox}
      label={<label>Science</label>}
      id = 'Science' name= 'Science' value = "Science" onChange={handleChange}   
    />
    </h5>
    <h5>
   <FormField
      control={Checkbox}
      label={<label>Sports</label>}
      id = 'Sports' name= 'Sports' value = "Sports" onChange={handleChange}   
    />
    </h5>
    <h5>
  <FormField
      control={Checkbox}
      label={<label>Technology</label>}
      id = 'Technology' name= 'Technology' value = "Technology" onChange={handleChange}   
    />
    </h5>
    <h5>
  <FormField
      control={Checkbox}
      label={<label>U.S.</label>}
      id = 'US' name= 'US' value = "US" onChange={handleChange}   
    />
</h5>
            <h2 className='separator'>or</h2>
<FormField>
      <input type= 'text' id='Anything' name='anything' placeholder='anything' onChange={handleForm}/>
        <label for= "Anything">             Most popular articles by search term </label>
    </FormField>
    <div className='button-preferences'>
        <button className="preferences" onClick={handleChange}>Save Preferences</button> 
        </div>
        <div className="button-preferences">
     <Link to = 'preferences'><button className='save'>See Front Page News</button></Link> 
       
        </div>
    
        </form>
</body>
    )}







export default Preferences