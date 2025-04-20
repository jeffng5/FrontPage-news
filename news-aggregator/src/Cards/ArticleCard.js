import React from 'react'
import "../css/FrontPage.css"
import Archive from "../Buttons/Archive"
import ColoredLineThin from "../SmallComponents/ColoredLineThin"
import ButtonForum from "../Buttons/ButtonForum"



// Card template to hold the articles returned

//receiving prop data from parent
const ArticleCard = ({items}) => {
    let username = localStorage.getItem('username')


    return (
       
  <>
   {items.map(item => (
    <>
    <div className='article'>
    <p><img className = 'photograph' src={item.image} alt = 'news'/></p>
    <h2 className='headline' id='headline'><span><a href={item.url} target="_blank">{item.title}<h5 className='desc'>{item.excerpt}</h5></a></span></h2>
    </div>
    <div className='button-6'>
    <Archive username={username} link={item.url} title={item.title} excerpt={item.excerpt} author={item.author}/>
    </div>
    <div className='button-6'>
    <ButtonForum username={username} title={item.title} excerpt={item.excerpt} link={item.url} author={item.author} media={item.image}/></div>
    <div className='author-2'>by: {item.author}</div>
    <div className='line'>
    <ColoredLineThin color = "gray" />  
    </div>
    </>
 ))}
    </>
     
)

}
    


export default ArticleCard;