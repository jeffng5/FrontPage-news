import React, { useState, useEffect } from 'react'
import "./css/FrontPage.css"
import "./css/semantic.css"
import { jwtDecode } from "jwt-decode"
import axios from 'axios'
import ArticleCard from "./ArticleCard"
import ColoredLine from "./ColoredLine"
import { Link, useNavigate } from 'react-router-dom'




let pref = localStorage.getItem('preferences')

// let subj = '' || pref.split(',') 

let subj = pref ? pref.split(',') : "";

let term = localStorage.getItem('freePreferences')



// holds bulk of search, many API calls, displays current date
const FrontPage = () => {


    let username = localStorage.getItem('username')
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


    // states for all the topics
    const navigate = useNavigate()
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [dateTime, setDateTime] = useState(new Date())
    const [search, setSearch] = useState([])
    const [australia, setAustralia] = useState([])
    const [asia, setAsia] = useState([])
    const [uk, setUk] = useState([])
    const [us, setUS] = useState([])
    const [business, setBusiness] = useState([])
    const [entertainment, setEntertainment] = useState([])
    const [general, setGeneral] = useState([])
    const [food, setFood] = useState([])
    const [science, setScience] = useState([])
    const [sports, setSports] = useState([])
    const [technology, setTechnology] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const date = dateTime.toLocaleDateString();

    useEffect(() => {
        console.log(userLoggedIn)
    }, [userLoggedIn])


    useEffect(() => {
        setDateTime(new Date());
        checkToken()
        //this API call gets articles according to subject from the newsAPI.org
        const getApi = async () => {
            const apiKey = process.env.REACT_APP_APIKEY

            let options = {
                method: 'GET',
                url: 'https://api.newscatcherapi.com/v2/latest_headlines?countries=au&lang=en&page=1',
                headers: { 'x-api-key': apiKey }
            }

            let options1 = {
                method: 'GET',
                url: 'https://api.newscatcherapi.com/v2/latest_headlines?countries=jp&lang=en&page=1',
                headers: { 'x-api-key': apiKey }
            }

            let options2 = {
                method: 'GET',
                url: 'https://api.newscatcherapi.com/v2/latest_headlines?countries=gb&lang=en&page=1',
                headers: { 'x-api-key': apiKey }
            }

            let options3 = {
                method: 'GET',
                url: 'https://api.newscatcherapi.com/v2/latest_headlines?topic=US&lang=en&page=1',
                headers: { 'x-api-key': apiKey }
            }

            let options4 = {
                method: 'GET',
                url: 'https://api.newscatcherapi.com/v2/latest_headlines?countries=US&topic=business&lang=en&page=1',

                headers: { 'x-api-key': apiKey }
            }

            let options5 = {
                method: 'GET',
                url: 'https://api.newscatcherapi.com/v2/latest_headlines?countries=US&topic=entertainment&lang=en&page=1',
                headers: { 'x-api-key': apiKey }
            }

            let options6 = {
                method: 'GET',
                url: 'https://api.newscatcherapi.com/v2/latest_headlines?countries=US&topic=news&lang=en&page=1',

                headers: { 'x-api-key': apiKey }
            }

            let options7 = {
                method: 'GET',
                url: 'https://api.newscatcherapi.com/v2/latest_headlines?topic=food&lang=en&page=1',

                headers: { 'x-api-key': apiKey }
            }

            let options8 = {
                method: 'GET',
                url: 'https://api.newscatcherapi.com/v2/latest_headlines?countries=US&topic=science&lang=en&page=1',

                headers: { 'x-api-key': apiKey }
            }

            let options9 = {
                method: 'GET',
                url: 'https://api.newscatcherapi.com/v2/latest_headlines?topic=sport&lang=en&page=1',

                headers: { 'x-api-key': apiKey }
            }

            let options10 = {
                method: 'GET',
                url: 'https://api.newscatcherapi.com/v2/latest_headlines?topic=tech&lang=en&page=1',

                headers: { 'x-api-key': apiKey }
            }

            try {
                if (subj[0] === 'Australia' || subj[1] === 'Australia' || subj[2] === 'Australia' || subj[3] === 'Australia'
                    || subj[4] === 'Australia') {
                    await axios.request(options).then(function (response) {
                        console.log(response.data.articles);
                        setAustralia(response.data.articles)
                    }).catch(function (error) { console.error(error) })
                }


                if (subj[0] === 'Asia' || subj[1] === 'Asia' || subj[2] === 'Asia' || subj[3] === 'Asia'
                    || subj[4] === 'Asia') {
                    await axios.request(options1).then(function (response) {
                        console.log(response.data.articles);
                        setAsia(response.data.articles)
                    }).catch(function (error) { console.error(error) })
                }

                if (subj[0] === 'U.K.' || subj[1] === 'U.K.' || subj[2] === 'U.K.' || subj[3] === 'U.K.'
                    || subj[4] === 'U.K.') {
                    await axios.request(options2).then(function (response) {
                        console.log(response.data.articles);
                        setUk(response.data.articles)
                    }).catch(function (error) { console.error(error) })
                }

                if (subj[0] === 'US' || subj[1] === 'US' || subj[2] === 'US' || subj[3] === 'US'
                    || subj[4] === 'US') {
                    await axios.request(options3).then(function (response) {
                        console.log(response.data.articles);
                        setUS(response.data.articles)
                    }).catch(function (error) { console.error(error) })
                }

                if (subj[0] === 'Business' || subj[1] === 'Business' || subj[2] === 'Business' || subj[3] === 'Business' || subj[4] === 'Business') {
                    await axios.request(options4).then(function (response) {
                        console.log(response.data.articles);
                        setBusiness(response.data.articles)
                    }).catch(function (error) { console.error(error) })
                }



                if (subj[0] === 'Entertainment' || subj[1] === 'Entertainment' || subj[2] === 'Entertainment' || subj[3] === 'Entertainment' || subj[4] === 'Entertainment') {
                    await axios.request(options5).then(function (response) {
                        console.log(response.data.articles);
                        setEntertainment(response.data.articles)
                    }).catch(function (error) { console.error(error) })
                }
                if (subj[0] === 'General' || subj[1] === 'General' || subj[2] === 'General' || subj[3] === 'General' || subj[4] === 'General') {
                    await axios.request(options6).then(function (response) {
                        console.log(response.data.articles);
                        setGeneral(response.data.articles)
                    }).catch(function (error) { console.error(error) })
                }


                if (subj[0] === 'Food' || subj[1] === 'Food' || subj[2] === 'Food' || subj[3] === 'Food' || subj[4] === 'Food') {
                    await axios.request(options7).then(function (response) {
                        console.log(response.data.articles);
                        setFood(response.data.articles)
                    }).catch(function (error) { console.error(error) })
                }

                if (subj[0] === 'Science' || subj[1] === 'Science' || subj[2] === 'Science' || subj[3] === 'Science' || subj[4] === 'Science') {
                    await axios.request(options8).then(function (response) {
                        console.log(response.data.articles);
                        setScience(response.data.articles)
                    }).catch(function (error) { console.error(error) })
                }

                if (subj[0] === 'Sports' || subj[1] === 'Sports' || subj[2] === 'Sports' || subj[3] === 'Sports' || subj[4] === 'Sports') {
                    await axios.request(options9).then(function (response) {
                        console.log(response.data.articles);
                        setSports(response.data.articles)
                    }).catch(function (error) { console.error(error) })
                }

                if (subj[0] === 'Technology' || subj[1] === 'Technology' || subj[2] === 'Technology' || subj[3] === 'Technology' || subj[4] === 'Technology') {
                    await axios.request(options10).then(function (response) {
                        console.log(response.data.articles);
                        setTechnology(response.data.articles)
                    }).catch(function (error) { console.error(error) })
                }
            }
            catch (err) { console.log(err) }

        };

        //  this API call gets teh term search from newAPI.org
        const getApi2 = async () => {
            const apiKey = process.env.REACT_APP_APIKEY

            let options11 = {
                method: 'GET',
                url: `https://api.newscatcherapi.com/v2/search?q=${term}&language=en&pagesize=1`,
                headers: { 'x-api-key': apiKey }
            }

            try {
                await axios.request(options11).then(function (response) {
                    console.log(response.data.articles);
                    setSearch(response.data.articles)
                }).catch(function (error) { console.error(error) })
            } catch (e) { console.log(e) }
        }
        getApi();
        // getApi2();
        setSearch(null);
    }, []);

    async function loading() {
        setIsLoading(false)
        console.log(loading)
    }
    setTimeout(loading, 2000)

    if (isLoading) { return (<h1>FETCHING...Your Front Page News...please WAIT</h1>) }

    else {
        if (userLoggedIn && username) {

            return (

                <>
                    <div className='links'>
                        <Link to="/">Hi {username},</Link>
                        <Link to="/users">Preferences</Link>
                        <Link to="/users/frontpage">FrontPage</Link>
                        <Link to="/users/forum">Forum</Link>
                        <Link to="/users/archives">Archives</Link>
                        <Link to="/logout">Logout</Link>
                    </div>

                    <h1 className='title'>Your Front Page News </h1>
                    <h2 className='date'>{date}</h2>

                    <ColoredLine color="black" />


                    {us.map(c => (
                        <ArticleCard

                            title={c.title}
                            key={c.key}
                            url={c.link}
                            excerpt={c.excerpt}
                            media={c.media}

                            author={c.author} />))}

                    {australia.map(c => (
                        <ArticleCard

                            title={c.title}
                            link={c.link}
                            key={c.key}
                            excerpt={c.excerpt}
                            media={c.media}

                            author={c.author} />))}


                    {asia.map(c => (
                        <ArticleCard

                            title={c.title}
                            link={c.link}
                            key={c.key}
                            excerpt={c.excerpt}
                            media={c.media}

                            author={c.author} />))}

                    {business.map(c => (
                        <ArticleCard

                            title={c.title}
                            link={c.link}
                            key={c.key}
                            excerpt={c.excerpt}
                            media={c.media}

                            author={c.author} />))}

                    {entertainment.map(c => (
                        <ArticleCard

                            title={c.title}
                            link={c.link}
                            key={c.key}
                            excerpt={c.excerpt}
                            media={c.media}

                            author={c.author} />))}

                    {general.map(c => (
                        <ArticleCard

                            title={c.title}
                            link={c.link}
                            key={c.key}
                            excerpt={c.excerpt}
                            media={c.media}

                            author={c.author} />))}

                    {uk.map(c => (
                        <ArticleCard

                            title={c.title}
                            link={c.link}
                            key={c.key}
                            excerpt={c.excerpt}
                            media={c.media}

                            author={c.author} />))}

                    {food.map(c => (
                        <ArticleCard

                            title={c.title}
                            link={c.link}
                            key={c.key}
                            excerpt={c.excerpt}
                            media={c.media}

                            author={c.author} />))}

                    {science.map(c => (
                        <ArticleCard

                            title={c.title}
                            link={c.link}
                            key={c.key}
                            excerpt={c.excerpt}
                            media={c.media}

                            author={c.author} />))}

                    {sports.map(c => (
                        <ArticleCard

                            title={c.title}
                            link={c.link}
                            key={c.key}
                            excerpt={c.excerpt}
                            media={c.media}

                            author={c.author} />))}

                    {technology.map(c => (
                        <ArticleCard

                            title={c.title}
                            link={c.link}
                            key={c.key}
                            excerpt={c.excerpt}
                            media={c.media}

                            author={c.author} />))}

                    {search.map(c => (
                        <ArticleCard

                            title={c.title}
                            link={c.link}
                            key={c.key}
                            excerpt={c.excerpt}
                            media={c.media}

                            author={c.author} />))}

                    <h2 className='closing'><Link to='/users'>Go back to Preferences Page</Link></h2>
                </>

            )
        }
        else {
            navigate('/')

        }
    }
}





export default FrontPage