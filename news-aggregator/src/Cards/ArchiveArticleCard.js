import React from "react";
import "../css/FrontPage.css";
import ColoredLineThin from "../SmallComponents/ColoredLineThin";

/** Matches Front Page article cards: title link, description, byline, gray rule. */
const ArchiveArticleCard = ({ title, url, description, author }) => {
  return (
    <article className="article-card">
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
      <p className="article-card__byline">by: {author || "Unknown"}</p>
      <div className="article-card__divider">
        <ColoredLineThin color="gray" />
      </div>
    </article>
  );
};

export default ArchiveArticleCard;
