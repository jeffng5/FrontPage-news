import React, {useState, useEffect} from 'react'
import "./FrontPage.css"
import axios from 'axios'
import ArticleCard from "./ArticleCard"
import ColoredLine from "./ColoredLine"
import { Link } from 'react-router-dom'

let username = localStorage.getItem('username')
const apiKey = process.env.REACT_APP_APIKEY
let pref = localStorage.getItem('preferences')
let subj = pref.split(",")
let term = localStorage.getItem('freePreferences')
console.log(term)
console.log(subj[0])
console.log(apiKey)

// holds bulk of search, many API calls, displays current date
const FrontPage = () => {
// states for all the topics
    const [dateTime, setDateTime] = useState(new Date())
    const [term, setTerm] = useState([])
    const [australia, setAustralia] =useState([])
    const [asia, setAsia] = useState([])
    const [uk, setUk] = useState([])
    const [us, setUS] = useState([])
    const [business, setBusiness] = useState([])
    const [entertainment, setEntertainment] = useState([])
    const [general, setGeneral] = useState([])
    const [health, setHealth] = useState([])
    const [science, setScience] = useState([])
    const [sports, setSports] = useState([])
    const [technology, setTechnology] = useState([])
    const date = dateTime.toLocaleDateString();

useEffect (()=> {
    setDateTime(new Date());
    const getApi = async() => {
   
        try { 
        if (subj[0]==='Australia' || subj[1]=== 'Australia' || subj[2]==='Australia' || subj[3]==='Australia'
        || subj[4]=== 'Australia') {
            const res = await axios.get(`https://newsapi.org/v2/top-headlines?country=au&pageSize=10&apiKey=${apiKey}`)
            setAustralia(res['data']['articles'])
        }
        if (subj[0]==='Asia' || subj[1]=== 'Asia' || subj[2]==='Asia' || subj[3]==='Asia'
        || subj[4]=== 'Asia'){
            const res1 = await axios.get(`https://newsapi.org/v2/top-headlines?country=jp&apiKey=${apiKey}`)
            setAsia(res1['data']['articles'])
        }
        if (subj[0]==='U.K.' || subj[1]=== 'U.K.' || subj[2]==='U.K.' || subj[3]==='U.K.'
        || subj[4]==='U.K.') {
            const res2 = await axios.get(`https://newsapi.org/v2/top-headlines?country=gb&apiKey=${apiKey}`)
            setUk(res2['data']['articles'])
        }
    
        if (subj[0]==='US' || subj[1]=== 'US' || subj[2]==='US' || subj[3]==='US'
        || subj[4]=== 'US') {
            const res3 = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`)
            setUS(res3['data']['articles'])
        
        }
        if (subj[0]==='Business' || subj[1]==='Business' || subj[2] === 'Business' || subj[3]=== 'Business' || subj[4]==='Business') {
            const res4 = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=15&apiKey=${apiKey}`)
        console.log(res4)
        setBusiness(res4['data']['articles'])
    }  
        if (subj[0]==='Entertainment' || subj[1]==='Entertainment' || subj[2] === 'Entertainment' || subj[3]=== 'Entertainment' || subj[4]==='Entertainment'){
            const res5 = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=entertainment&pageSize=15&apiKey=${apiKey}`)
      
        setEntertainment(res5['data']['articles'])
    }  
        if (subj[0]==='General' || subj[1]==='General' || subj[2] === 'General' || subj[3]=== 'General' || subj[4]==='General'){
        const res6 = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=general&pageSize=15&apiKey=${apiKey}`)
    
    setGeneral(res6['data']['articles'])
    }  
        if (subj[0]==='Health' || subj[1]==='Health' || subj[2] === 'Health' || subj[3]=== 'Health' || subj[4]==='Health'){
        const res7 = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=health&pageSize=15&apiKey=${apiKey}`)
    
    setHealth(res7['data']['articles'])
    }  
    
    if (subj[0]==='Science' || subj[1]==='Science' || subj[2] === 'Science' || subj[3]=== 'Science' || subj[4]==='Science'){
        const res8 = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=science&pageSize=15&apiKey=${apiKey}`)
    
    setScience(res8['data']['articles'])
    }  
    
    if (subj[0]==='Sports' || subj[1]==='Sports' || subj[2] === 'Sports' || subj[3]=== 'Sports' || subj[4]==='Sports'){
        const res9 = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=sports&pageSize=15&apiKey=${apiKey}`)
    
    setSports(res9['data']['articles'])
    }  
    
    if (subj[0]==='Technology' || subj[1]==='Technology' || subj[2] === 'Technology' || subj[3]=== 'Technology' || subj[4]==='Technology'){
        const res10 = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=15&apiKey=${apiKey}`)
    
    setTechnology(res10['data']['articles'])
    
    
    if (term){
    const res11 = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&q=${term}pageSize=15&apiKey=${apiKey}`)
    
    setTerm(res11['data']['articles'])
    } }
        }
    
    
    
    catch (err) {console.log(err)}
        console.log(australia)
        console.log(subj)
    };   
    getApi();
    
}, [])

 





return (
    <>
     <div className='links'>
        <Link to = ""><p>Hi {username},</p></Link>
        <Link to = "/users"><p>Preferences</p></Link>
        
        <Link to = "/users/archives"><p>Archives</p></Link>
      
        <Link to = "/logout"><p>Logout</p></Link>
   
        </div>
<h1>Your Front Page News </h1>
<h2>{date}</h2>

<ColoredLine color = "black" />

{us.map(c => (
    <ArticleCard  title = {c.title} 
    url = {c.url}
    description ={c.description}
   urlToImage= {c.urlToImage}

    author = {c.author} />))} 

{australia.map(c => (
    <ArticleCard  title = {c.title} 
    url = {c.url}
    description ={c.description}
   urlToImage= {c.urlToImage}

    author = {c.author} />))}


{asia.map(c => (
    <ArticleCard  title = {c.title} 
    url = {c.url}
    description ={c.description}
   urlToImage= {c.urlToImage}

    author = {c.author} />))}

{business.map(c => (
    <ArticleCard  title = {c.title} 
    url = {c.url}
    description ={c.description}
   urlToImage= {c.urlToImage}

    author = {c.author} />))} 

{entertainment.map(c => (
    <ArticleCard  title = {c.title} 
    url = {c.url}
    description ={c.description}
   urlToImage= {c.urlToImage}

    author = {c.author} />))} 

{general.map(c => (
    <ArticleCard  title = {c.title} 
    url = {c.url}
    description ={c.description}
   urlToImage= {c.urlToImage}

    author = {c.author} />))} 

{uk.map(c => (
    <ArticleCard  title = {c.title} 
    url = {c.url}
    description ={c.description}
   urlToImage= {c.urlToImage}

    author = {c.author} />))} 

{health.map(c => (
    <ArticleCard  title = {c.title} 
    url = {c.url}
    description ={c.description}
   urlToImage= {c.urlToImage}

    author = {c.author} />))} 

{science.map(c => (
    <ArticleCard  title = {c.title} 
    url = {c.url}
    description ={c.description}
   urlToImage= {c.urlToImage}

    author = {c.author} />))} 

{sports.map(c => (
    <ArticleCard  title = {c.title} 
    url = {c.url}
    description ={c.description}
   urlToImage= {c.urlToImage}

    author = {c.author} />))} 

{technology.map(c => (
    <ArticleCard  title = {c.title} 
    url = {c.url}
    description ={c.description}
   urlToImage= {c.urlToImage}

    author = {c.author} />))} 

{term.map(c => (
    <ArticleCard  title = {c.title} 
    url = {c.url}
    description ={c.description}
   urlToImage= {c.urlToImage}

    author = {c.author} />))} 

<h2><Link to = '/users'>Go back to Preferences Page</Link></h2>
</>)
}

    

    

export default FrontPage