import React from 'react'
import './css/forum.css'
import Comments from './Comments'
import Comment from './Comment'

// component to add structure into each article 
const ForumArticleCard = ({title, description, url, author, likes, id}) =>{

    console.log({url})
    return (
        <>
        <p className='forum-article-card'>
        <h2 className='url-forum'><a href= {url} className= 'url' target='_blank'>{title}</a></h2>
        <p className= 'description-forum-article'>{description}</p>
        <p className='author-forum-article'>-Author: {author}</p>

        
        <p className='commentary'><Comments id ={id} /></p> 
        <p className= 'commentary'><Comment id={id}/></p>
        </p>
        </>
    
    )
}


export default ForumArticleCard