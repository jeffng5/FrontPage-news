import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./css/FrontPage.css";
import "./css/semantic.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import ArticleCard from "./ArticleCard";
import ColoredLine from "./ColoredLine";
import { Link, Navigate } from "react-router-dom";

const apiKey = process.env.REACT_APP_APIKEY;
console.log("apiKey", apiKey);

function parseTopics(pref) {
  if (pref == null || pref === "") return [];
  return String(pref)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}
console.log("topics", parseTopics(localStorage.getItem("preferences")));
function hasTopic(topics, name) {
  return topics.includes(name);
}

/** Normalized title for dedupe, or null when title is missing/blank (those rows are not deduped). */
function articleTitleDedupeKey(article) {
  const raw = article?.title;
  if (raw == null) return null;
  const s = String(raw).trim();
  return s === "" ? null : s.toLowerCase();
}

/**
 * Dedupes articles by identical title (case-insensitive, trimmed).
 * When given multiple arrays in order, the first occurrence of a title wins across the whole page.
 */
function dedupeArticlesByTitle(...sectionLists) {
  const seen = new Set();
  return sectionLists.map((articles) => {
    const list = Array.isArray(articles) ? articles : [];
    return list.filter((article) => {
      const key = articleTitleDedupeKey(article);
      if (key == null) return true;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  });
}

const FrontPage = () => {
  const username = localStorage.getItem("username");

  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());
  const [search, setSearch] = useState([]);
  const [australia, setAustralia] = useState([]);
  const [asia, setAsia] = useState([]);
  const [uk, setUk] = useState([]);
  const [us, setUS] = useState([]);
  const [business, setBusiness] = useState([]);
  const [entertainment, setEntertainment] = useState([]);
  const [general, setGeneral] = useState([]);
  const [health, setHealth] = useState([]);
  const [science, setScience] = useState([]);
  const [sports, setSports] = useState([]);
  const [technology, setTechnology] = useState([]);

  const date = dateTime.toLocaleDateString();

  const checkToken = useCallback(() => {
    const token = localStorage.getItem("token");
    console.log("token", token);
    console.log('username', username);
    if (!token) {
      setUserLoggedIn(false);
      return;
    }
    try {
      jwtDecode(token);
      setUserLoggedIn(true);
    } catch {
      setUserLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    setDateTime(new Date());
    checkToken();

    const pref = localStorage.getItem("preferences");
    const topics = parseTopics(pref);
    const rawTerm = localStorage.getItem("freePreferences");
    const term =
      rawTerm != null && String(rawTerm).trim() !== ""
        ? String(rawTerm).trim()
        : null;

    const getApi = async () => {
      try {
        if (hasTopic(topics, "Australia")) {
          const res = await axios.get(
            `https://api.mediastack.com/v1/news?access_key=${apiKey}&countries=au`
          );
          console.log("res", res);
          setAustralia(res?.data?.data ?? []);
        }
        if (hasTopic(topics, "Asia")) {
          const res1 = await axios.get(
            `https://api.mediastack.com/v1/news?access_key=${apiKey}&countries=jp,cn,tw,hk,kr,id`
          );
          setAsia(res1?.data?.data ?? []);
        }
        if (hasTopic(topics, "U.K.")) {
          const res2 = await axios.get(
            `https://api.mediastack.com/v1/news?access_key=${apiKey}&countries=gb`
          );
          setUk(res2?.data?.data ?? []);
        }
        if (hasTopic(topics, "US")) {
          const res3 = await axios.get(
            `https://api.mediastack.com/v1/news?access_key=${apiKey}&countries=us`
          );
          setUS(res3?.data?.data ?? []);
        }
        if (hasTopic(topics, "Business")) {
          const res4 = await axios.get(
            `https://api.mediastack.com/v1/news?access_key=${apiKey}&keywords=business&limit=30`
          );
          setBusiness(res4?.data?.data ?? []);
        }
        if (hasTopic(topics, "Entertainment")) {
          const res5 = await axios.get(
            `https://api.mediastack.com/v1/news?access_key=${apiKey}&keywords=entertainment&limit=30`
          );
          setEntertainment(res5?.data?.data ?? []);
        }
        if (hasTopic(topics, "General")) {
          const res6 = await axios.get(
            `https://api.mediastack.com/v1/news?access_key=${apiKey}&keywords=worldnews&limit=30`
          );
          setGeneral(res6?.data?.data ?? []);
        }
        if (hasTopic(topics, "Health")) {
          const res7 = await axios.get(
            `https://api.mediastack.com/v1/news?access_key=${apiKey}&keywords=health&limit=30`
          );
          setHealth(res7?.data?.data ?? []);
        }
        if (hasTopic(topics, "Science")) {
          const res8 = await axios.get(
            `https://api.mediastack.com/v1/news?access_key=${apiKey}&keywords=science&limit=30`
          );
          setScience(res8?.data?.data ?? []);
        }
        if (hasTopic(topics, "Sports")) {
          const res9 = await axios.get(
            `https://api.mediastack.com/v1/news?access_key=${apiKey}&keywords=sports&limit=30`
          );
          setSports(res9?.data?.data ?? []);
        }
        if (hasTopic(topics, "Technology")) {
          const res10 = await axios.get(
            `https://api.mediastack.com/v1/news?access_key=${apiKey}&keywords=technology&limit=30`
          );
          setTechnology(res10?.data?.data ?? []);
        }
      } catch {}
    };

    const getApi2 = async () => {
      try {
        const q = encodeURIComponent(term);
        const res11 = await axios.get(
          `https://api.mediastack.com/v1/news?access_key=${apiKey}&keywords=${q}&limit=30`
        );
        setSearch(res11?.data?.data ?? []);
      } catch {
        setSearch([]);
      }
    };

   
    getApi2();
    getApi();
    setSearch([]);

  }, []);

  const [
    usDisplay,
    australiaDisplay,
    asiaDisplay,
    businessDisplay,
    entertainmentDisplay,
    generalDisplay,
    ukDisplay,
    healthDisplay,
    scienceDisplay,
    sportsDisplay,
    technologyDisplay,
    searchDisplay,
  ] = useMemo(
    () =>
      dedupeArticlesByTitle(
        us,
        australia,
        asia,
        business,
        entertainment,
        general,
        uk,
        health,
        science,
        sports,
        technology,
        search
      ),
    [
      us,
      australia,
      asia,
      business,
      entertainment,
      general,
      uk,
      health,
      science,
      sports,
      technology,
      search,
    ]
  );

//   if (!userLoggedIn || username === null) {
//     return <Navigate to="/" />;
//   }

  return (
    <main className="front-page">
      <div className="front-page__inner">
        <nav className="front-page__nav links" aria-label="Main">
          <Link to="/">Hi {username},</Link>
          <Link to="/users">Preferences</Link>
          <Link to="/users/frontpage">FrontPage</Link>
          <Link to="/users/forum">Forum</Link>
          <Link to="/users/archives">Archives</Link>
          <Link to="/logout">Logout</Link>
        </nav>

        <header className="front-page__header">
          <h1 className="front-page__title title">Your Front Page News</h1>
          <h2 className="front-page__date date">{date}</h2>
        </header>

        <div className="front-page__rule">
          <ColoredLine color="black" />
        </div>

        <section className="front-page__articles">
          {usDisplay.map((c, i) => (
            <ArticleCard
              title={c.title}
              key={c.url || `us-${i}`}
              url={c.url}
              description={c.description}
              image={c.image}
              author={c.author}
            />
          ))}

          {australiaDisplay.map((c, i) => (
            <ArticleCard
              title={c.title}
              url={c.url}
              key={c.url || `au-${i}`}
              description={c.description}
              image={c.image}
              author={c.author}
            />
          ))}

          {asiaDisplay.map((c, i) => (
            <ArticleCard
              title={c.title}
              url={c.url}
              key={c.url || `asia-${i}`}
              description={c.description}
              image={c.image}
              author={c.author}
            />
          ))}

          {businessDisplay.map((c, i) => (
            <ArticleCard
              title={c.title}
              url={c.url}
              key={c.url || `biz-${i}`}
              description={c.description}
              image={c.image}
              author={c.author}
            />
          ))}

          {entertainmentDisplay.map((c, i) => (
            <ArticleCard
              title={c.title}
              url={c.url}
              key={c.url || `ent-${i}`}
              description={c.description}
              image={c.image}
              author={c.author}
            />
          ))}

          {generalDisplay.map((c, i) => (
            <ArticleCard
              title={c.title}
              url={c.url}
              key={c.url || `gen-${i}`}
              description={c.description}
              image={c.image}
              author={c.author}
            />
          ))}

          {ukDisplay.map((c, i) => (
            <ArticleCard
              title={c.title}
              url={c.url}
              key={c.url || `uk-${i}`}
              description={c.description}
              image={c.image}
              author={c.author}
            />
          ))}

          {healthDisplay.map((c, i) => (
            <ArticleCard
              title={c.title}
              url={c.url}
              key={c.url || `hlth-${i}`}
              description={c.description}
              image={c.image}
              author={c.author}
            />
          ))}

          {scienceDisplay.map((c, i) => (
            <ArticleCard
              title={c.title}
              url={c.url}
              key={c.url || `sci-${i}`}
              description={c.description}
              image={c.image}
              author={c.author}
            />
          ))}

          {sportsDisplay.map((c, i) => (
            <ArticleCard
              title={c.title}
              url={c.url}
              key={c.url || `sprt-${i}`}
              description={c.description}
              image={c.image}
              author={c.author}
            />
          ))}

          {technologyDisplay.map((c, i) => (
            <ArticleCard
              title={c.title}
              url={c.url}
              key={c.url || `tech-${i}`}
              description={c.description}
              image={c.image}
              author={c.author}
            />
          ))}

          {searchDisplay.map((c, i) => (
            <ArticleCard
              title={c.title}
              url={c.url}
              key={c.url || `q-${i}`}
              description={c.description}
              image={c.image}
              author={c.author}
            />
          ))}
        </section>

        <footer className="front-page__footer">
          <h2 className="closing">
            <Link to="/users">Go back to Preferences Page</Link>
          </h2>
        </footer>
      </div>
    </main>
  );
};

export default FrontPage;
