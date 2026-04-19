import React, { useState } from "react";
import "../css/FrontPage.css";
import { saveArticle } from "../api";
import myImage from "./penfeather.png";

const Archive = ({ username, url, title, description, author }) => {
  const [activeButton, setActiveButton] = useState(true);

  async function handleArchive() {
    try {
      setActiveButton(false);
      await saveArticle(username, url, title, description, author);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <button
      type="button"
      className="archive"
      onClick={handleArchive}
      style={{ backgroundColor: activeButton ? "gold" : "grey" }}
    >
      <img className="article-card__archive-icon" src={myImage} alt="" />
      Archive
    </button>
  );
};

export default Archive;
