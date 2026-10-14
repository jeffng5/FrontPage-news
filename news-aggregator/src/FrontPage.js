import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./css/FrontPage.css";
import "./css/semantic.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import ArticleCard from "./ArticleCard";
import ColoredLine from "./SmallComponents/ColoredLine";
import { Link, useLocation } from "react-router-dom";

const apiKey = process.env.REACT_APP_APIKEY;
const pendingSearchRequests = new Map();

function fetchSearchArticles(term) {
  if (!pendingSearchRequests.has(term)) {
    const q = encodeURIComponent(term);
    const request = axios.get(
      `https://api.mediastack.com/v1/news?access_key=${apiKey}&keywords=${q}&languages=en&sort=published_desc&limit=30`
    ).finally(() => pendingSearchRequests.delete(term));
    pendingSearchRequests.set(term, request);
  }
  return pendingSearchRequests.get(term);
}

function parseTopics(pref) {
  if (pref == null || pref === "") return [];
  return String(pref)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}
console.log("topics", parseTopics(localStorage.getItem("preferences")));

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
  const location = useLocation();
  const selectedTopics = location.state?.topics ?? localStorage.getItem("preferences") ?? "";
  const selectedTerm = localStorage.getItem("freePreferences") ?? "";

  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());
  const [search, setSearch] = useState([]);
  const [searchError, setSearchError] = useState("");
  const [topicErrors, setTopicErrors] = useState([]);
  const [australia, setAustralia] = useState([]);
  const [asia, setAsia] = useState([]);
  const [uk, setUk] = useState([]);
  const [us, setUS] = useState([]);
  const [food, setFood] = useState([]);
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
    let active = true;
    setDateTime(new Date());
    checkToken();

    const topics = parseTopics(selectedTopics);
    const rawTerm = selectedTerm;
    // Older preference saves stored a missing value as the string "null".
    const term = rawTerm == null || rawTerm === "null" ? "" : rawTerm.trim();

    async function fetchTopic(topic, url, setArticles) {
      try {
        const response = await axios.get(url);
        if (response?.data?.error) throw new Error(response.data.error.info || "Request failed.");
        if (active) setArticles(response?.data?.data ?? []);
      } catch {
        if (active) setTopicErrors(previous => [...previous, topic]);
      }
    }
    console.log("topics", topics)
    const getApi = async () => {
      setTopicErrors([]);
      setAustralia([]);
      setAsia([]);
      setUk([]);
      setUS([]);
      setBusiness([]);
      setEntertainment([]);
      setFood([]);
      setGeneral([]);
      setHealth([]);
      setScience([]);
      setSports([]);
      setTechnology([]);

      if (topics.includes("Australia")) {
        await fetchTopic("Australia",
          `https://api.mediastack.com/v1/news?access_key=${apiKey}&languages=en&countries=au`, setAustralia);
      }
      if (topics.includes("Asia")) {
        await fetchTopic("Asia",
          `https://api.mediastack.com/v1/news?access_key=${apiKey}&languages=en&countries=jp,cn,tw,hk,kr,id`, setAsia);
      }
      if (topics.includes("U.K.")) {
        await fetchTopic("U.K.",
          `https://api.mediastack.com/v1/news?access_key=${apiKey}&languages=en&countries=gb`, setUk);
      }
      if (topics.includes("US")) {
        await fetchTopic("US",
          `https://api.mediastack.com/v1/news?access_key=${apiKey}&languages=en&countries=us`, setUS);
      }
      if (topics.includes("Business")) {
        await fetchTopic("Business",
          `https://api.mediastack.com/v1/news?access_key=${apiKey}&languages=en&keywords=business&limit=30`, setBusiness);
      }
      if (topics.includes("Entertainment")) {
        await fetchTopic("Entertainment",
          `https://api.mediastack.com/v1/news?access_key=${apiKey}&keywords=entertainment&languages=en&limit=30`, setEntertainment);
      }
      if (topics.includes("Food")) {
        await fetchTopic("Food",
          `https://api.mediastack.com/v1/news?access_key=${apiKey}&keywords=food,culinary&languages=en&limit=30`, setFood);
      }
      if (topics.includes("General")) {
        await fetchTopic("General",
          `https://api.mediastack.com/v1/news?access_key=${apiKey}&keywords=worldnews&languages=en&limit=30`, setGeneral);
      }
      if (topics.includes("Health")) {
        await fetchTopic("Health",
          `https://api.mediastack.com/v1/news?access_key=${apiKey}&keywords=health&languages=en&limit=30`, setHealth);
      }
      if (topics.includes("Science")) {
        await fetchTopic("Science",
          `https://api.mediastack.com/v1/news?access_key=${apiKey}&keywords=science&languages=en&limit=30`, setScience);
      }
      if (topics.includes("Sports")) {
        await fetchTopic("Sports",
          `https://api.mediastack.com/v1/news?access_key=${apiKey}&keywords=sports&languages=en&limit=30`, setSports);
      }
      if (topics.includes("Technology")) {
        await fetchTopic("Technology",
          `https://api.mediastack.com/v1/news?access_key=${apiKey}&keywords=technology&languages=en&limit=30`, setTechnology);
      }
    };

    const getApi2 = async () => {
      try {
        const res11 = await fetchSearchArticles(term);
        if (res11?.data?.error) {
          throw new Error(res11.data.error.info || "Search request failed.");
        }
        if (active) setSearch(res11?.data?.data ?? []);
      } catch (error) {
        if (!active) return;
        setSearch([]);
        setSearchError(
          error.response?.status === 429
            ? "The news provider is limiting requests. Please try again shortly."
            : error.response?.data?.error?.info || error.message || "Search request failed."
        );
      }
    };

    setSearch([]);
    setSearchError("");
    if (term !== "") {
      getApi2();
    }
    getApi();
    return () => { active = false; };
  }, [checkToken, selectedTopics, selectedTerm]);

  const [
    usDisplay,
    australiaDisplay,
    asiaDisplay,
    businessDisplay,
    entertainmentDisplay,
    foodDisplay,
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
        food,
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
      food,
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
        <nav className="links" aria-label="Main">
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

        {topicErrors.length > 0 && <p role="alert">Unable to load articles for: {topicErrors.join(", ")}. Please try again shortly.</p>}
        {searchError && <p role="alert">Unable to load search articles: {searchError}</p>}
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

          {foodDisplay.map((c, i) => (
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
