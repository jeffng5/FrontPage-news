import React, { useState } from 'react'
import '../css/forum.css'
import Comments from '../Comments'
import Comment from '../Comment'

// component to add structure into each article 
const ForumArticleCard = ({title, description, url, author, id, urlToImage}) =>{
    const [commentsRefresh, setCommentsRefresh] = useState(0)

    return (
        <article className='forum-article-card'>
          <header className='forum-article-card__header'>
            {urlToImage && <img src={urlToImage} alt='' className='forum-article-card__image' />}
            <h2 className='url-forum'><a href={url} className='url' target='_blank' rel='noopener noreferrer'>{title}</a></h2>
            {description && <p className='description-forum-article'>{description}</p>}
            <p className='author-forum-article'>By {author || 'Unknown author'}</p>
          </header>
          <section className='forum-discussion' aria-label='Discussion'>
            <h3 className='forum-discussion__title'>Discussion</h3>
            <div className='commentary'><Comments id={id} refreshVersion={commentsRefresh} /></div>
            <div className='commentary commentary--form'><Comment id={id} onCommentPosted={() => setCommentsRefresh((n) => n + 1)} /></div>
          </section>
        </article>
    
    )
}


export default ForumArticleCard
