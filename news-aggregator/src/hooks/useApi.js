import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ArticleCard from "../Cards/ArticleCard"
import ColoredLine from "../SmallComponents/ColoredLine"


const useApi = () => {
    const apiKey = process.env.REACT_APP_APIKEY
    let pref = localStorage.getItem('preferences')
    let term = localStorage.getItem('freePreferences')
    console.log('debugging', term)
    let subj = pref ? pref.split(',') : "";
    console.log('PREFS', subj)
    const [article, setArticle] = useState([])
    const [article1, setArticle1] = useState([])
    const [search, setSearch] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        findArticlesByCountry();
        findArticlesByTopic();
        findArticlesBySearchTerm();
        setSearch([]);
    }, [])
    async function findArticlesByCountry() {
        const mySearchParams = {
            'Australia': 'au',
            'Asia': 'jp',
            'U.K.': 'gb',
            'US': 'us',
        }
// API call for country's articles
        for (const [key, value] of Object.entries(mySearchParams)) {
            console.log('key', key)
            let options = {
            method : 'GET',
            url : `https://api.thenewsapi.com/v1/news/top?api_token=${apiKey}&locale=${value}&limit=50&language=en`,
            headers : { 'Content-Type' : 'application/json' },
            // params : {
            //     'limit' : 50,
            //     'language': 'en'  
            // }
            }
            
            if (subj[0] === key || subj[1] === key || subj[2] === key || subj[3] === key
                || subj[4] === key) {
                let res = await axios.request(options)
                console.log(res)
                    setArticle(res.data.data)
                }
 }
            };

        
   

// API Call for articles according to topic
    async function findArticlesByTopic() {
        
        const myTopicParams = {

            'Business': 'business',
            'Entertainment': 'entertainment',
            'General': 'news',
            'Food': 'food',
            'Science': 'science',
            'Sports': 'sports',
            'Technology': 'technology',
           
        }

        for (const [k, v] of Object.entries(myTopicParams)){
            
            let options1 = {
                method : 'GET',
                url : `https://api.thenewsapi.com/v1/news/top?api_token=${apiKey}&locale=us&categories=${v}&limit=50&language=en`,
                headers : { 'Content-Type' : 'application/json' },
                //params : {
                    // 'categories' : `${value}`,
                //     'limit' : 50,
                //     'api_token': apiKey
               // }
                }
            
            if (subj[0] === k || subj[1] === k || subj[2] === k || subj[3] ===k || subj[4] === k) {
    
                let res = await axios.request(options1)
                console.log(res.data.data)
                
                setArticle1(res.data.data);
                

            }
        }
    };
        
    

// API Call to articles according to a search term    
    async function findArticlesBySearchTerm() {
       
        console.log('TERM', term)
        let fetchSearch = {
            method : 'GET', 
            url :`https://api.thenewsapi.com/v1/news/top?api_token=${apiKey}&search=${term}&limit=50&language=en`,
            // params : { 
            //     'language' : 'en',
            //     'limit' : 50 
            // },
            headers : { 'Content-Type' : 'application/json' } 
        }  
        if (term != null) {
            try {
      
            let res = await axios.request(fetchSearch)
                console.log(res)
                setSearch(res.data.data);
                localStorage.removeItem('freePreferences')
            } catch(e) {
        console.log(e)
    }
    };
    };

    // const arrayOfArticles = Object.entries(article)
    // const arrayOfArticles1 = Object.entries(article1)
    // const arrayOfSearches = Object.entries(search)

    console.log('SEARCH', search)
    console.log('ARTICLE1', article1)
    console.log('ARTICLE',article)

    let objectConcat = [...article, ...search, ...article1]
    console.log({error})


    return (
        <>
       <h1>{error}</h1>
                    
                <ArticleCard items = {objectConcat} />
    
        </>

    )
            };


export default useApi