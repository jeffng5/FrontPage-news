import React from 'react'
import "./FrontPage.css"
import Archive from "./Archive"
import ColoredLineThin from "./ColoredLineThin"
import ButtonForum from "./ButtonForum"


let username = localStorage.getItem('username')
// Card template to hold the articles returned

//receiving prop data from parent
const ArticleCard = ({title, description, url, author, urlToImage}) => {

console.log(title)    
    return (
    <>
    <p>
    <div className='article'>
    <p><img className = 'photograph' src={urlToImage} alt = 'news'/></p>
    <h2 className='headline' id='headline'><span><a href={url} target="_blank">{title}<h5 className='desc'>{description}</h5></a></span></h2>

    <div className='button'>
    <Archive username={username} title={title} description={description} url={url} author={author} />

    <ButtonForum username={username} title={title} description={description} url={url} author={author} urltoImage={urlToImage}/></div>
    <div className='author'><h4 className='author'> by: {author} </h4></div>
    </div>
    </p>

    <ColoredLineThin color = "gray" />  
    </>
)

}
    


export default ArticleCard;