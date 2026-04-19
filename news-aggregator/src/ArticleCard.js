import React from "react";
import Archive from "./Buttons/Archive";
import ColoredLineThin from "./SmallComponents/ColoredLineThin";
import ButtonForum from "./Buttons/ButtonForum";

let username = localStorage.getItem("username");

const ArticleCard = ({ title, description, url, author, image }) => {
  return (
    <article className="article-card">
      <div className="article-card__media">
        {image ? (
          <img
            className="article-card__image"
            src={image}
            alt=""
          />
        ) : null}
      </div>
      <div className="article-card__body">
        <h2 className="article-card__title">
          {url ? (
            <a href={url} target="_blank" rel="noopener noreferrer">
              {title}
            </a>
          ) : (
            title
          )}
        </h2>
        {description ? (
          <p className="article-card__description">{description}</p>
        ) : null}
      </div>
      <div className="article-card__actions">
        <Archive
          username={username}
          title={title}
          description={description}
          url={url}
          author={author}
        />
        <ButtonForum
          username={username}
          title={title}
          description={description}
          url={url}
          author={author}
          image={image}
        />
      </div>
      <p className="article-card__byline">by: {author || "Unknown"}</p>
      <div className="article-card__divider">
        <ColoredLineThin color="gray" />
      </div>
    </article>
  );
};

export default ArticleCard;
