import React, { useState } from "react";
import "../css/forum.css";
import { postLike } from "../api";
import Likes from "../Likes";

function LikeIcon() {
  return (
    <svg
      className="like-icon"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      />
    </svg>
  );
}

function formatPosterDate(datetime) {
  if (datetime == null) return "";
  const s = String(datetime);
  if (s.length < 10) return s;
  return `${s.slice(0, 10)}, ${s.slice(11, 19)}`;
}

const CommentCard = ({ comment, username, datetime }) => {
  const [likeBump, setLikeBump] = useState(0);

  async function addLikes() {
    try {
      await postLike(comment);
      setLikeBump((b) => b + 1);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="comment-card-whole">
      <p className="comment-card__body">&ldquo;{comment}&rdquo;</p>
      <div className="comment-card__row">
        <span className="comment-card__poster">
          —{username} on {formatPosterDate(datetime)}
        </span>
        <button
          type="button"
          className="like-button"
          onClick={addLikes}
          aria-label="Like comment"
        >
          <LikeIcon />
        </button>
        <Likes comment={comment} bump={likeBump} />
      </div>
    </div>
  );
};

export default CommentCard;
