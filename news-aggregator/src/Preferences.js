import React, { useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import "./css/semantic.css";
import "./css/PreferencesPage.css";
import { Link, Navigate } from "react-router-dom";

const TOPICS = [
  { id: "Australia", name: "Australia", value: "Australia", label: "Australia" },
  { id: "Asia", name: "Asia", value: "Asia", label: "Asia" },
  { id: "Business", name: "Business", value: "Business", label: "Business" },
  {
    id: "Entertainment",
    name: "Entertainment",
    value: "Entertainment",
    label: "Entertainment",
  },
  { id: "General", name: "General", value: "General", label: "General" },
  { id: "U.K", name: "U.K", value: "U.K.", label: "U.K." },
  { id: "Health", name: "Health", value: "Health", label: "Health" },
  { id: "Science", name: "Science", value: "Science", label: "Science" },
  { id: "Sports", name: "Sports", value: "Sports", label: "Sports" },
  {
    id: "Technology",
    name: "Technology",
    value: "Technology",
    label: "Technology",
  },
  { id: "US", name: "US", value: "US", label: "U.S." },
];

function parseTopicsFromStorage(raw) {
  if (raw == null || raw === "") return [];
  return String(raw)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

const Preferences = () => {
  const user = localStorage.getItem("username");
  const pref = localStorage.getItem("preferences");

  const [prefs, setPrefs] = useState(pref ?? "");
  const [selectedTopics, setSelectedTopics] = useState(() =>
    parseTopicsFromStorage(pref)
  );
  const [searchTerm, setSearchTerm] = useState(() => {
    const raw = localStorage.getItem("freePreferences");
    return raw != null ? String(raw) : "";
  });
  /** Last value written to localStorage on Save (shown under box when draft is empty). */
  const [committedSearch, setCommittedSearch] = useState(() => {
    const raw = localStorage.getItem("freePreferences");
    return raw != null ? String(raw).trim() : "";
  });
  const [userLoggedIn, setUserLoggedIn] = useState(() =>
    Boolean(localStorage.getItem("token"))
  );

  function checkToken() {
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
  }

  useEffect(() => {
    const stored = localStorage.getItem("preferences");
    setPrefs(stored ?? "");
    setSelectedTopics(parseTopicsFromStorage(stored));
    const free = localStorage.getItem("freePreferences");
    const freeStr = free != null ? String(free) : "";
    setSearchTerm(freeStr);
    setCommittedSearch(freeStr.trim());
    checkToken();
  }, []);

  const handleTopicChange = useCallback((e) => {
    if (!user) return;
    const val = e.target.value;
    const checked = e.target.checked;

    setSelectedTopics((prev) => {
      if (checked) {
        if (prev.includes(val)) return prev;
        if (prev.length >= 5) return prev;
        return [...prev, val];
      }
      return prev.filter((x) => x !== val);
    });
  }, [user]);

  const handleSavePreferences = useCallback(() => {
    if (!user) return;
    if (selectedTopics.length < 1) {
      window.alert("Please choose at least one topic (up to 5).");
      return;
    }
    if (selectedTopics.length > 5) {
      window.alert("You can select at most 5 topics.");
      return;
    }
    const next = selectedTopics.join(",");
    localStorage.setItem("preferences", next);
    setPrefs(next);

    const trimmedSearch = searchTerm.trim();
    if (trimmedSearch) {
      localStorage.setItem("freePreferences", trimmedSearch);
    } else {
      localStorage.removeItem("freePreferences");
    }
    setCommittedSearch(trimmedSearch);
  }, [user, selectedTopics, searchTerm]);

  if (!userLoggedIn || !user) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="preferences-page">
      <nav
        className="preferences-page__nav links"
        aria-label="Preferences navigation"
      >
        <Link to="/">Hi {user},</Link>
        <Link to="/users">Preferences</Link>
        <Link to="/users/frontpage">FrontPage</Link>
        <Link to="/users/forum">Forum</Link>
        <Link to="/users/archives">Archives</Link>
        <Link to="/logout">Logout</Link>
      </nav>

      <h1 className="preferences-page__title prefs">News Topic Preferences</h1>

      <p className="preferences-page__lead topics">
        <span className="preferences-page__current-label">
          Your current topics are:
        </span>
        <span className="preferences-page__current-value color">
          {prefs || "(none saved yet)"}
        </span>
      </p>

      <p className="preferences-page__instruction topics">
        Please choose one (up to 5), then click Save Preferences:
      </p>

      <form
        className="preferences-page__form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSavePreferences();
        }}
      >
        <div className="preferences-page__checkboxes selection">
          {TOPICS.map((t) => (
            <div key={t.id} className="preferences-page__checkbox">
              <label className="preferences-page__check-label" htmlFor={t.id}>
                <input
                  type="checkbox"
                  id={t.id}
                  name={t.name}
                  value={t.value}
                  checked={selectedTopics.includes(t.value)}
                  onChange={handleTopicChange}
                />
                <span>{t.label}</span>
              </label>
            </div>
          ))}
        </div>

        <p className="preferences-page__separator separator" aria-hidden="true">
          or
        </p>

        <div className="preferences-page__wildcard anything">
          <label htmlFor="Anything">Most popular articles by search term</label>
          <input
            type="text"
            id="Anything"
            name="anything"
            placeholder="Search term"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoComplete="off"
          />
          {(searchTerm.trim() !== "" || committedSearch !== "") && (
            <p
              className="preferences-page__search-display"
              aria-live="polite"
            >
              <span className="preferences-page__search-display-label">
                {searchTerm.trim() !== ""
                  ? "Search term: "
                  : "Saved search term: "}
              </span>
              <span className="preferences-page__search-display-value">
                {searchTerm.trim() || committedSearch}
              </span>
            </p>
          )}
        </div>

        <div className="preferences-page__actions">
          <div className="button-preferences">
            <button type="submit" className="preferences">
              Save Preferences
            </button>
          </div>
          <div className="button-preferences">
            <Link to="/users/frontpage">
              <button type="button" className="save">
                See Front Page News
              </button>
            </Link>
          </div>
        </div>
      </form>
    </main>
  );
};

export default Preferences;
