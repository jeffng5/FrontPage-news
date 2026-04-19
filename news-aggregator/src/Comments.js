import React, { useState, useEffect } from "react";
import "./css/forum.css";
import { getAllComments } from "./api";
import CommentCard from "./Cards/CommentCard";

const Comments = ({ id, refreshVersion = 0 }) => {
  const [state, setState] = useState([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await getAllComments(id);
        if (!cancelled && Array.isArray(res?.comments)) {
          setState(res.comments);
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) setState([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id, refreshVersion]);

  return (
    <>
      {state.map((c) => (
        <CommentCard
          key={c.id}
          comment={c.comment}
          username={c.username}
          datetime={c.datetime}
        />
      ))}
    </>
  );
};

export default Comments;
