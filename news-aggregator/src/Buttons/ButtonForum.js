import React, { useState } from "react";
import "../css/FrontPage.css";
import { postForum } from "../api";

const ButtonForum = ({
  username,
  url,
  title,
  description,
  author,
  urlToImage,
  image,
}) => {
  const [, setState] = useState([]);
  const [buttonColor, setButtonColor] = useState(true);

  const handleForum = async () => {
    try {
      setButtonColor(false);
      const res = await postForum(
        username,
        url,
        title,
        description,
        author,
        urlToImage != null && String(urlToImage).trim() !== ""
          ? urlToImage
          : image
      );
      setState(res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <button
      type="button"
      className="forum"
      onClick={handleForum}
      style={{ backgroundColor: buttonColor ? "gold" : "grey" }}
    >
      <p className="article-card__forum-label">Post to Forum</p>
    </button>
  );
};

export default ButtonForum;
