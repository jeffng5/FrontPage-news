import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ArticleCard from "../Cards/ArticleCard"
import ColoredLine from "../SmallComponents/ColoredLine"

const useApi = () => {

    const apiKey = process.env.REACT_APP_APIKEY
    let pref = localStorage.getItem('preferences')
    let subj = pref ? pref.split(',') : "";

    const [article, setArticle] = useState([])
    const [article1, setArticle1] = useState([])
    const [search, setSearch] = useState([])

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
                method: 'GET',
                url: `https://api.newscatcherapi.com/v2/latest_headlines?countries=${value}&lang=en&page=1`,
                headers: { 'x-api-key': apiKey }
            }
            if (subj[0] === key || subj[1] === key || subj[2] === key || subj[3] === key
                || subj[4] === key) {
                axios.request(options).then(function (response) {
                    console.log(response.data.articles);
                    setArticle(response.data.articles)
                }).catch(function (error) { console.error(error) })
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
            'Sports': 'sport',
            'Technology': 'tech'
        }
        for (const [key, value] of Object.entries(myTopicParams)) {

            let options1 = {
                method: 'GET',
                url: `https://api.newscatcherapi.com/v2/latest_headlines?topic=${value}&lang=en&page=1`,
                headers: { 'x-api-key': apiKey }
            }

            if (subj[0] === key || subj[1] === key || subj[2] === key || subj[3] === key
                || subj[4] === key) {
                axios.request(options1).then(function (response) {
                    console.log(response.data.articles);
                    setArticle1(response.data.articles)
                }).catch(function (error) { console.error(error) })
            }
        }
    }

// API Call to articles according to a search term    
    function findArticlesBySearchTerm() {
        let term = localStorage.getItem('freePreferences')
        let options11 = {
            method: 'GET',
            url: 'https://api.newscatcherapi.com/v2/search',
            params: { q: term, countries: 'US', lang: 'en', page: '1' },
            headers: { 'x-api-key': apiKey }
        }

        try {
            axios.request(options11).then(function (response) {
                console.log(response.data.articles);
                setSearch(response.data.articles)
                localStorage.removeItem('freePreferences')
            }).catch(function (error) { console.error(error) })
        } catch (e) {
            console.log(e)
        }
    }

    return (

        <>
            {article.map(c => (
                <ArticleCard
                    title={c.title}
                    key={c.key}
                    url={c.link}
                    excerpt={c.excerpt}
                    media={c.media}
                    author={c.author} />
            ))}
            {article1.map(c => (
                <ArticleCard
                    title={c.title}
                    key={c.key}
                    url={c.link}
                    excerpt={c.excerpt}
                    media={c.media}
                    author={c.author} />
            ))}
            {search.map(c => (
                <ArticleCard
                    title={c.title}
                    key={c.key}
                    url={c.link}
                    excerpt={c.excerpt}
                    media={c.media}
                    author={c.author} />
            ))}

        </>

    )

}
export default useApi