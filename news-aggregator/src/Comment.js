import React, { useState } from "react";
import "./css/forum.css";
import { postComment } from "./api";

const Comment = ({ id, onCommentPosted }) => {
  const username = localStorage.getItem("username");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);

  async function addComment(e) {
    e.preventDefault();
    const text = body.trim();
    if (!text) {
      setStatus("Write a comment first.");
      return;
    }
    setPending(true);
    setStatus("");
    try {
      const datetime = new Date();
      await postComment(username, text, id, datetime);
      setBody("");
      setStatus("Comment added.");
      onCommentPosted?.();
    } catch (err) {
      console.error(err);
      setStatus("Could not post comment.");
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <form onSubmit={addComment}>
        <textarea
          placeholder="Type comment here..."
          name="message"
          rows={3}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button
          type="submit"
          className="add-comment"
          disabled={pending}
        >
          {pending ? "Posting…" : "Add Comment"}
        </button>
      </form>
      {status ? (
        <p className="comment-form__status" role="status">
          {status}
        </p>
      ) : null}
    </>
  );
};

export default Comment;
