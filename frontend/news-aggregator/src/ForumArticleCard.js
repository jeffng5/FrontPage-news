import React from 'react'
import './css/forum.css'
import Comments from './Comments'
import Comment from './Comment'


const ForumArticleCard = ({title, description, url, author, likes, id}) =>{
    return (
        <>

        <a href= {url} className= 'url' target='_blank'><h7 className='title-forum-article'>{title}</h7><h7 className= 'description-forum-article'>{description}</h7></a><h7 className='author-forum-article'>-Author: {author}</h7>
{likes}
        
        <p className='commentary'><Comments id ={id} /></p>
        <p className= 'commentary'><Comment id={id}/></p>
        
        
        </>
    )
}


export default ForumArticleCard