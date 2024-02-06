import React, { useState, useEffect } from 'react'
import "./Login.css"
import { Link } from 'react-router-dom'




const Preferences = () => {
    let username = localStorage.getItem('username')
    let pref = localStorage.getItem('preferences')
    const searchTopics=[]

    const initialState = pref
    const [prefs, setPrefs] = useState(initialState)


useEffect(()=>{
    setPrefs(pref)
   
}, []
)

// function to intake search term and save to localStorage
const handleForm = (e) => {

        let wildCard=[]
        wildCard.push(e.target.value)
        localStorage.setItem('freePreferences', wildCard)
    }

// capture the checkbox input
function handleChange(e) {
 // protected with username/sign in
    if (username) {
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
            localStorage.setItem('preferences', searchTopics)

            //error handle if searchTopics is >5 or <1
            if (searchTopics.length > 5 || searchTopics.length < 1) {
                throw Error("You must select between 1 - 5 topics.")}

    }

console.log(localStorage.getItem('preferences'))
console.log(localStorage.getItem('freePreferences'))




// protecting route
if (username)
//////////////////////////////// CHECKBOX FORM ////////////////////////////////
    return (
        <>
        
     
        <div className='links'>
        <Link to = ""><p>Hi {username},</p></Link>
        <Link to = "/users"><p>Preferences</p></Link>
        
        <Link to = "/users/archives"><p>Archives</p></Link>
      
        <Link to = "/logout"><p>Logout</p></Link>
   
        </div>
        <h1>News Topic Preferences</h1> 
     
        <h3> Your current Topics Are: <h3 className='color'>{prefs}</h3></h3>
        
        <h3> Please Choose One (Up to 5): </h3>

<form>
        <div>
        <input type = 'checkbox' id ='Australia' name='Australia' value= 'Australia' onChange={handleChange}></input>   
        <label for= "Australia">Australia</label>
        </div>
        <div>
        <input type = 'checkbox'   id ='Asia' name='Asia' value= 'Asia' onChange={handleChange} ></input>   
        <label for= "Asia">Asia</label>
        </div>
        <div>
        <input type = 'checkbox'  id='business' name= "business" value= "Business" onChange={handleChange} ></input>
        <label for= "business" >Business</label>
        </div>
        <div>
        <input type = 'checkbox'   id ='entertainment' name='entertainment' value= 'Entertainment' onChange={handleChange}></input>   
        <label for= "entertainment">Entertainment</label>
        </div>
        <div>
        <input type = 'checkbox'   id ='general' name='general' value= 'General' onChange={handleChange}></input>   
        <label for= "general">General</label>
        </div>
        <div>
        <input type = 'checkbox' id ='U.K.' name='U.K.' value= 'U.K.' onChange={handleChange} ></input>   
        <label for= "Europe">U.K.</label>
        </div>
        <div>
        <input type = 'checkbox'  id ='health' name='health' value= 'Health' onChange={handleChange} ></input>   
        <label for= "health">Health</label>
        </div>
        <div>
        <input type = 'checkbox' id ='science' name='science' value= 'Science' onChange={handleChange} ></input>   
        <label for= "science">Science</label>
        </div>
        <div>
        <input type = 'checkbox'   id ='sports' name='sports' value= 'Sports' onChange={handleChange}></input>   
        <label for= "sports">Sports</label>
        </div>
        <div>
        <input type = 'checkbox'  id ='technology' name='technology' value= 'Technology' onChange={handleChange}></input>   
        <label for= "technology">Technology</label>
        </div>
        <div>
        <input type = 'checkbox' id ='US' name='US' value= 'US' onChange={handleChange}></input>   
        <label for= "US">U.S.</label>
        </div>
        <div className='button'>
        <button className="save" onClick={handleChange}>Save Preferences</button> 
        </div>
            <h2>OR</h2>
        <input type = 'text' id ='Anything' name='Anything' placeholder='Anything' onChange={handleForm}></input>   
        <label for= "Anything"> most popular articles by search term / phrase </label> 
        
        <div className="button">
       <Link to = 'preferences'><button className='save'>See Front Page News</button></Link>
       
        </div>
    
        </form>
</>
    )}







export default Preferences