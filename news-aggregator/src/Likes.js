import React, { useState, useEffect } from "react";
import { getPostLike } from "./api";
import "./css/forum.css";

const Likes = ({ comment, bump = 0 }) => {
  const [likeCount, setLikeCount] = useState(null);

  useEffect(() => {
    if (comment == null || String(comment).trim() === "") {
      setLikeCount(null);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await getPostLike(comment);
        const n = res?.thing?.[0]?.likes;
        if (!cancelled) setLikeCount(n != null ? n : 0);
      } catch {
        if (!cancelled) setLikeCount(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [comment, bump]);

  return <span className="comment-card__likes">{likeCount ?? "—"}</span>;
};

export default Likes;
