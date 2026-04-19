/**
 * Direct fetch calls to the backend (replaces the old Helpers/axios layer).
 * BASE_URL must match the Express server (see backend server port).
 */

const BASE_URL = (process.env.REACT_APP_BASE_URL || "http://localhost:3001").replace(
  /\/$/,
  ""
);

function buildUrl(path, query) {
  const rel = String(path).replace(/^\//, "");
  const url = new URL(`${BASE_URL}/${rel}`);
  if (query && typeof query === "object") {
    Object.entries(query).forEach(([k, v]) => {
      if (v === undefined || v === null) return;
      const s = v instanceof Date ? v.toISOString() : String(v);
      url.searchParams.set(k, s);
    });
  }
  return url.toString();
}

/**
 * @param {string} path - e.g. "login" or "users/forum"
 * @param {{ method?: string, query?: object, body?: object }} options
 * @returns {Promise<any>} Parsed JSON body, or null if empty
 */
export async function apiJson(path, { method = "GET", query, body } = {}) {
  const token = localStorage.getItem("token");
  const headers = { Accept: "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const url =
    method === "GET" && query && Object.keys(query).length
      ? buildUrl(path, query)
      : `${BASE_URL}/${String(path).replace(/^\//, "")}`;

  const init = { method, headers };
  if (body != null && method !== "GET" && method !== "HEAD") {
    headers["Content-Type"] = "application/json";
    init.body = JSON.stringify(body);
  }

  const res = await fetch(url, init);
  const text = await res.text();
  let data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { _nonJson: text };
    }
  }

  if (!res.ok) {
    const msg = data?.error ?? data?.message ?? res.statusText;
    const arr = Array.isArray(msg)
      ? msg.map(String)
      : [msg != null ? String(msg) : `Request failed (${res.status})`];
    throw arr;
  }
  return data;
}

export async function loginUser(username, password) {
  const data = await apiJson("login", {
    method: "GET",
    query: { username, password },
  });
  if (data?.token) localStorage.setItem("token", data.token);
  if (data?.user) localStorage.setItem("username", data.user);
  return data;
}

export async function signUpUser(username, password, email) {
  const data = await apiJson("register", {
    method: "POST",
    body: { username, password, email },
  });
  if (data?.token) localStorage.setItem("token", data.token);
  if (data?.user) localStorage.setItem("username", data.user);
  return data;
}

export async function getArticles(username) {
  return apiJson("users/archives", {
    method: "GET",
    query: { username },
  });
}

export async function saveArticle(username, url, title, description, author) {
  return apiJson("users/frontpage", {
    method: "POST",
    body: { username, url, title, description, author },
  });
}

export async function postForum(
  username,
  url,
  title,
  description,
  author,
  urlToImage
) {
  return apiJson("users/forum", {
    method: "POST",
    body: { username, url, title, description, author, urlToImage },
  });
}

export async function getForum() {
  return apiJson("users/forum", { method: "GET" });
}

export async function postComment(username, comment, forum_art_id, datetime) {
  return apiJson("users/forum/comments", {
    method: "POST",
    body: { username, comment, forum_art_id, datetime },
  });
}

export async function getAllComments(id) {
  return apiJson("users/forum/comments", {
    method: "GET",
    query: { id },
  });
}

export async function postLike(comment) {
  return apiJson("users/forum/likes", {
    method: "POST",
    body: { comment },
  });
}

export async function getPostLike(comment) {
  return apiJson("users/forum/likes", {
    method: "GET",
    query: { comment },
  });
}
