import React from 'react'
import "../css/FrontPage.css"
import Archive from "../Buttons/Archive"
import ColoredLineThin from "../SmallComponents/ColoredLineThin"
import ButtonForum from "../Buttons/ButtonForum"



// Card template to hold the articles returned

//receiving prop data from parent
const ArticleCard = ({title, excerpt, url, author, media}) => {
    let username = localStorage.getItem('username')

    console.log({url})
    return (
    <>
  
    <div className='article'>
    <p><img className = 'photograph' src={media} alt = 'news'/></p>
    <h2 className='headline' id='headline'><span><a href={url} target="_blank">{title}<h5 className='desc'>{excerpt}</h5></a></span></h2>
    </div>
    <div className='button-6'>
    <Archive username={username} link={url} title={title} excerpt={excerpt} author={author}/>
    </div>
    <div className='button-6'>
    <ButtonForum username={username} title={title} excerpt={excerpt} link={url} author={author} media={media}/></div>
    <div className='author-2'>by: {author}</div>
    <div className='line'>
    <ColoredLineThin color = "gray" />  
    </div>
   
    </>
)

}
    


export default ArticleCard;