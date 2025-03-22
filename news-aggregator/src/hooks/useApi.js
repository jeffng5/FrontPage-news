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
    function findArticlesByCountry() {
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
            url : `https://newsapi.org/v2/top-headlines?country=${value}&lang=en&page=1`,
            headers : { 'x-api-key': apiKey, 'Content-Type' : 'application/json' }
            }
            
            if (subj[0] == key || subj[1] == key || subj[2] == key || subj[3] == key
                || subj[4] == key) {
                axios.request(options).then(response=> {
                    console.log(response);
                    console.log(response.data.articles);
                    setArticle(response.data.articles)
                }) 
                  if (article== [])  
                        {setError('The API has reached its call limit for the day.')
                    
                { console.log('The API has reached its call limit for the day.') } }
            }

        }
   }

// API Call for articles according to topic
    function findArticlesByTopic() {
        
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
            method: 'GET',
            url : `https://newsapi.org/v2/everything?q=${value}`,
            headers : { 'x-api-key': apiKey, 'Content-Type' : 'application/json' }
            }
            
            if (subj[0] == key || subj[1] == key || subj[2] == key || subj[3] == key
                || subj[4] == key) 
            
                {
                axios.request(options1).then(response =>{
                console.log(response.status)
                console.log(response.data.articles);
                setArticle1(response.data.articles);
                })
                if (article1 == []) {
                {setError('The API has reached its call limit for the day.')
                console.log('The API has reached its call limit for the day.') 
                }}
            
        }
        }
    }

// API Call to articles according to a search term    
    function findArticlesBySearchTerm() {
        let term = localStorage.getItem('freePreferences')
        console.log(term)
        let search = {
            method : 'GET', 
            url :`https://newsapi.org/v2/everything?q=${term}`,
            params : { lang:'en' , page: '1'},
            headers : { 'x-api-key': apiKey, 'Content-Type' : 'application/json' } 
        }  
            try {
            axios.request(search).then(response=>{
                console.log(response);
                console.log(response.data.articles);
                setSearch(response.data.articles);
                // localStorage.removeItem('freePreferences')
            }).catch(function (error) { console.error(error) })
        } catch(e) {
            setError('The API has reached its call limit for the day.')
            console.log('The API has reached its call limit for the day.')
        }
    }

    console.log({error})
    return (

        <>
       {error}
            {article.map(c => (
                <ArticleCard
                    title={c.title}
                    // key={c.key}
                    url={c.url}
                    excerpt={c.description}
                    media={c.urlToImage}
                    author={c.author} />
            ))}
            {article1.map(c => (
                <ArticleCard
                    title={c.title}
                    // key={c.key}
                    url={c.url}
                    excerpt={c.description}
                    media={c.urlToImage}
                    author={c.author} />
            ))}
            {search.map(c => (
                <ArticleCard
                    title={c.title}
                    // key={c.key}
                    url={c.url}
                    excerpt={c.description}
                    media={c.urlToImage}
                    author={c.author} />
            ))}

        </>

    )

}

export default useApi