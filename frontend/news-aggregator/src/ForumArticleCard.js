import React from 'react'
import './css/forum.css'
import Comments from './Comments'
import Comment from './Comment'


const ForumArticleCard = ({title, description, url, author, likes, id}) =>{
    return (
        <>

        <a href= {url} className= 'url' target='_blank'><h5 className='title-forum-article'>{title}</h5><h5 className= 'description-forum-article'>{description}</h5></a>   
        <h5 className='author-forum-article'>{author}</h5>{likes}
        
        <p className='commentary'><Comments id ={id} /></p>
        <p className= 'commentary'><Comment id={id}/></p>
        
        
        </>
    )
}


export default ForumArticleCard