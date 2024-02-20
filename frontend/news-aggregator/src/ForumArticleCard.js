import React from 'react'
import './css/forum.css'
import Comment from './Comment'


const ForumArticleCard = ({title, description, url, author, likes, id}) =>{
    return (
        <>
        {/* <img src={urlToImage} alt='news'></img> */}
        <a href= {url} target='_blank'><h5 className='title'>{title}</h5><h5 className= 'title'>{description}</h5></a>   
        <span><h5 className='title'>{author}</h5>{likes}</span>
        
        <p className='commentary'><Comment id ={id} /></p>
        
        </>
    )
}


export default ForumArticleCard