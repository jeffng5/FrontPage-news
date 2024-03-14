import React, { useState } from 'react'
import axios from 'axios'

const useApi = async() => {

    const apiKey = process.env.REACT_APP_APIKEY

    const [article, setArticle] = useState([])
    
    mySearchParams ={
        'Australia' : 'au',
        'Asia' : 'jp',
        'U.K.' : 'gb',
        'US' : 'US',
    }

    myTopicParams = {
        'Business' : 'business',
        'Entertainment' : 'entertainment',
        'General' : 'news',
        'Food': 'food',
        'Science' : 'science',
        'Sports' : 'sport',
        'Technology' : 'tech'
    }

for (const [key, value] of mySearchParams) {
    let options = {
        method: 'GET',
        url: `https://api.newscatcherapi.com/v2/latest_headlines?countries=${value}&lang=en&page=1`,
        headers: { 'x-api-key': apiKey }
    }
    if (subj[0] === key || subj[1] === key || subj[2] === key || subj[3] === key
    || subj[4] === key) {
    await axios.request(options).then(function (response) {
        console.log(response.data.articles);
        setAsia(response.data.articles)
    }).catch(function (error) { console.error(error) })
}

}

for (const [key, value] of myTopicParams) {
    let options1 = {
        method: 'GET',
        url: `https://api.newscatcherapi.com/v2/latest_headlines?countries=US&topic=${value}&lang=en&page=1`,
        headers: { 'x-api-key': apiKey }
    }

    if (subj[0] === key || subj[1] === key || subj[2] === key || subj[3] === key
    || subj[4] === key) {
    await axios.request(options1).then(function (response) {
        console.log(response.data.articles);
        setArticle(response.data.articles)
    }).catch(function (error) { console.error(error) })
}



}

}
export default useApi