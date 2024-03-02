import React from 'react'
import "./css/FrontPage.css"
import Archive from "./Archive"
import ColoredLineThin from "./ColoredLineThin"
import ButtonForum from "./ButtonForum"


let username = localStorage.getItem('username')
console.log(username)
// Card template to hold the articles returned

//receiving prop data from parent
const ArticleCard = ({title, description, url, author, urlToImage}) => {

  
    return (
    <>
  
    <div className='article'>
    <p><img className = 'photograph' src={urlToImage} alt = 'news'/></p>
    <h2 className='headline' id='headline'><span><a href={url} target="_blank">{title}<h5 className='desc'>{description}</h5></a></span></h2>
    </div>
    <div className='button-6'>
    <Archive username={username} title={title} description={description} url={url} author={author}/>
    </div>
    <div className='button-6'>
    <ButtonForum username={username} title={title} description={description} url={url} author={author} urltoImage={urlToImage}/></div>
    <div className='author-2'>by: {author}</div>
    <div className='line'>
    <ColoredLineThin color = "gray" />  
    </div>
   
    </>
)

}
    


export default ArticleCard;