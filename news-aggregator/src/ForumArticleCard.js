import React, { useState } from "react";
import "./css/forum.css";
import Comments from "./Comments";
import Comment from "./Comment";

// component to add structure into each article
const ForumArticleCard = ({
  title,
  description,
  url,
  author,
  likes,
  id,
  urlToImage,
}) => {
  const [commentsRefresh, setCommentsRefresh] = useState(0);

  return (
    <article className="forum-article-card">
      {urlToImage ? (
        <img src={urlToImage} alt="" className="forum-article-card__image" />
      ) : null}
      <a
        href={url}
        className="url"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="title-forum-article">{title}</span>
        <span className="description-forum-article">{description}</span>
      </a>
      <p className="author-forum-article">-Author: {author}</p>

      <div className="commentary">
        <Comments id={id} refreshVersion={commentsRefresh} />
      </div>
      <div className="commentary commentary--form">
        <Comment
          id={id}
          onCommentPosted={() =>
            setCommentsRefresh((n) => n + 1)
          }
        />
      </div>
    </article>
  );
}


export default ForumArticleCard