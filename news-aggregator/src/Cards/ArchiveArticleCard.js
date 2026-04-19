import React from 'react'
import '../css/App.css'

const ArchiveArticleCard = ({title, url, description, author}) => {

  return (
    <article className="divider-card">
      <h2 className="archive-card archive-card__title">Title: {title}</h2>
      <p className="archive-card">Description: {description}</p>
      <p className="archive-card">
        <a href={url} target="_blank" rel="noopener noreferrer">
          {url}
        </a>
      </p>
      <p className="archive-card-1">By: {author}</p>
    </article>
  );
}

export default ArchiveArticleCard
