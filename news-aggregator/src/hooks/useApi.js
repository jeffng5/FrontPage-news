import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ArticleCard from "../Cards/ArticleCard"
import ColoredLine from "../SmallComponents/ColoredLine"


const useApi = () => {
    const apiKey = process.env.REACT_APP_APIKEY
    let pref = localStorage.getItem('preferences')
    let term = localStorage.getItem('freePreferences')
    let TERM = term
    let subj = pref ? pref.split(',') : "";
    console.log('PREFS', subj)
    console.log('search term', TERM)
    const [article, setArticle] = useState([])
    const [article1, setArticle1] = useState([])
    const [search, setSearch] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        findArticlesByCountry();
        findArticlesByTopic();
        findArticlesBySearchTerm();
     
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
                method: 'GET',
                url: `https://api.thenewsapi.com/v1/news/top?api_token=${apiKey}&locale=${value}&limit=50&language=en`,
                headers: { 'Content-Type': 'application/json' },
            }

            if (subj[0] === key || subj[1] === key || subj[2] === key || subj[3] === key
                || subj[4] === key) {
                let res = await axios.request(options)
                console.log(res.data.data)
                const fetchedData = res.data.data
                setArticle((prev) => [...prev, ...fetchedData])
                // }
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
            'Technology': 'tech',
        }

        for (const [k, v] of Object.entries(myTopicParams)) {

            let options1 = {
                method: 'GET',
                url: `https://api.thenewsapi.com/v1/news/top?api_token=${apiKey}&categories=${v}&limit=50&language=en`,
                headers: { 'Content-Type': 'application/json' },
            }

            if (subj[0] === k || subj[1] === k || subj[2] === k || subj[3] === k || subj[4] === k) {
                let res = await axios.request(options1)
                console.log(res.data.data)
                let topicData = res.data.data
                setArticle1((prev) => [...prev, ...topicData]);
            }
        };
    };


    // API Call to articles according to a search term    
    async function findArticlesBySearchTerm(term) {
        console.log('89', term)
        let fetchSearch = {
            method: 'GET',
            url: `https://api.thenewsapi.com/v1/news/top?api_token=${apiKey}&search=${term}&limit=50&language=en`,
            headers: { 'Content-Type': 'application/json' }
        }
        let res = await axios.request(fetchSearch)

        if (res && TERM) {
            setSearch(res.data.data);
            localStorage.removeItem('freePreferences')
        }

        else {
            console.log('no search term was entered')

        }
    };

    console.log('SEARCH', search)
    console.log('ARTICLE1', article1)
    console.log('ARTICLE', article)


    let objectConcat = [...article, ...article1, ...search]


    return <ArticleCard items={objectConcat} />
   
};

export default useApi