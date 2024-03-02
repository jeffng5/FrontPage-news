import React from 'react'
import './css/forum.css'
import Comments from './Comments'
import Comment from './Comment'

// component to add structure into each article 
const ForumArticleCard = ({title, description, url, author, likes, id}) =>{
    return (
        <>
        <p className='forum-article-card'>
        <a href= {url} className= 'url' target='_blank'><p className='title-forum-article'>{title}</p><p className= 'description-forum-article'>{description}</p></a><p className='author-forum-article'>-Author: {author}</p>
{likes}
        
        <p className='commentary'><Comments id ={id} /></p> 
        <p className= 'commentary'><Comment id={id}/></p>
        </p>
        </>
    
    )
}


export default ForumArticleCard