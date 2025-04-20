import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ArticleCard from "../Cards/ArticleCard"
import ColoredLine from "../SmallComponents/ColoredLine"


const useApi = () => {
    const apiKey = process.env.REACT_APP_APIKEY
    let pref = localStorage.getItem('preferences')
    let subj = pref ? pref.split(',') : "";
    console.log('PREFS', subj)
    const [article, setArticle] = useState([])
    const [article1, setArticle1] = useState([])
    const [search, setSearch] = useState([])
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
            
            let options = {
            method : 'GET',
            url : `https://eventregistry.org/api/v1/article/getArticles`,
            headers : { 'Content-Type' : 'application/json' },
            params : {
                'action' : 'getArticles',
                'keyword' : `${value}`,
                'articlesCount' : 50,
                'articlesSortBy' : 'sourceImportance',
                'ignoreSourcesGroupUri' : 'paywall/paywalled_sources',
                'articlesPage': 1,
                'resultType' : 'articles',
                'apiKey' : apiKey        
            }
            }
            
            if (subj[0] === key || subj[1] === key || subj[2] === key || subj[3] === key
                || subj[4] === key) {
                let res = await axios.request(options)
                
                    setArticle(res.data.articles.results)
                }
                  if (article === [])  
                        {setError('The API has reached its call limit for the day.')
                    
                { console.log('The API has reached its call limit for the day.') } }
            }

        }
   

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
        for (const [key, value] of Object.entries(myTopicParams)) {
            
            let options1 = {
                method : 'GET',
                url : `https://eventregistry.org/api/v1/article/getArticles`,
                headers : { 'Content-Type' : 'application/json' },
                params : {
                    'action' : 'getArticles',
                    'keyword' : `${value}`,
                    'articlesCount' : 50,
                    'articlesSortBy' : 'sourceImportance',
                    'ignoreSourcesGroupUri' : 'paywall/paywalled_sources',
                    'articlesPage': 1,
                    'resultType' : 'articles',
                    'apiKey' : apiKey,
                }
                }
            
            if (subj[0] === key || subj[1] === key || subj[2] === key || subj[3] === key
                || subj[4] === key) 
            
                {
                let res = await axios.request(options1)
                console.log(res.data.articles.results)
                setArticle1(res.data.articles.results);
                }
                if (article1 === []) {
                {setError('The API has reached its call limit for the day.')
                console.log('The API has reached its call limit for the day.') 
                }}
            
        }
        }
    

// API Call to articles according to a search term    
    async function findArticlesBySearchTerm() {
        let term = localStorage.getItem('freePreferences')
        console.log(term)
        let search = {
            method : 'GET', 
            url :`https://eventregistry.org/api/v1/article/getArticles`,
            params : { 
                'action' : 'getArticles',
                'keyword' : `${term}`,
                'ignoreSourceGroupUri' : 'paywall/paywalled_sources',
                'articlesPage' : 1,
                'articlesCount' : 50,
                'articlesSortBy' : 'sourceImportance',
                'dataType' : 'news',
                'resultType' : 'articles',
                'apiKey' : apiKey, 
            },
            headers : { 'Content-Type' : 'application/json' } 
        }  
            try {
            let res = await axios.request(search)
                setSearch(res.data.articles.results);
                // localStorage.removeItem('freePreferences')
            
        } catch(e) {
            
            console.log('The API has reached its call limit for the day.')
        }
    }


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