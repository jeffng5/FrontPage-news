import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import FrontPage from "./FrontPage";

jest.mock("jwt-decode", () => ({
  jwtDecode: jest.fn(() => ({})),
}));

/** Mediastack list items use `image` (not urlToImage). */
const mediastackArticle = {
  title: "Test headline",
  url: "https://example.com/a",
  description: "Test description",
  image: "",
  author: "Author",
};

const consoleError = console.error;

function renderFrontPage() {
  return render(
    <MemoryRouter>
      <FrontPage />
    </MemoryRouter>
  );
}

beforeEach(() => {
  localStorage.setItem("token", "mock-token");
  localStorage.setItem("username", "tester");
  localStorage.setItem("preferences", "US");
  localStorage.removeItem("freePreferences");
  jest
    .spyOn(Date.prototype, "toLocaleDateString")
    .mockReturnValue("1/1/2026");
  jest.spyOn(axios, "get").mockResolvedValue({
    data: { data: [mediastackArticle] },
  });
  jest.spyOn(console, "error").mockImplementation((message, ...args) => {
    if (
      typeof message === "string" &&
      message.includes("not wrapped in act")
    ) {
      return;
    }
    consoleError.call(console, message, ...args);
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

it("renders without crashing", async function () {
  renderFrontPage();
  expect(await screen.findByRole("main")).toBeInTheDocument();
});

it("loads Mediastack article into the page", async function () {
  renderFrontPage();
  expect(await screen.findByText("Test headline")).toBeInTheDocument();
});

test("nav shows Preferences", async () => {
  renderFrontPage();
  expect(await screen.findByText("Preferences")).toBeInTheDocument();
});

test.each([null, "null", "", "   "])(
  "skips search requests when the search term is %p",
  async (term) => {
    if (term !== null) localStorage.setItem("freePreferences", term);

    renderFrontPage();
    expect(await screen.findByText("Test headline")).toBeInTheDocument();
    expect(axios.get).toHaveBeenCalledTimes(1);
    const params = new URL(axios.get.mock.calls[0][0]).searchParams;
    expect(params.get("countries")).toBe("us");
    expect(params.has("keywords")).toBe(false);
  }
);

test("fetches English articles for a trimmed search term", async () => {
  localStorage.setItem("preferences", "");
  localStorage.setItem("freePreferences", "  climate & energy  ");

  renderFrontPage();
  expect(await screen.findByText("Test headline")).toBeInTheDocument();
  expect(axios.get).toHaveBeenCalledTimes(1);
  const params = new URL(axios.get.mock.calls[0][0]).searchParams;
  expect(params.get("keywords")).toBe("climate & energy");
  expect(params.get("languages")).toBe("en");
});

test("shares the sports request across StrictMode effect reruns", async () => {
  localStorage.setItem("preferences", "");
  localStorage.setItem("freePreferences", "sports");
  render(
    <React.StrictMode>
      <MemoryRouter><FrontPage /></MemoryRouter>
    </React.StrictMode>
  );
  expect(await screen.findByText("Test headline")).toBeInTheDocument();
  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(new URL(axios.get.mock.calls[0][0]).searchParams.get("keywords")).toBe("sports");
});

test("shows a useful message when search is rate limited", async () => {
  localStorage.setItem("preferences", "");
  localStorage.setItem("freePreferences", "sports");
  axios.get.mockRejectedValueOnce({ response: { status: 429 } });
  renderFrontPage();
  expect(await screen.findByRole("alert")).toHaveTextContent("limiting requests");
});

test("shows provider errors returned in a successful HTTP response", async () => {
  localStorage.setItem("preferences", "");
  localStorage.setItem("freePreferences", "sports");
  axios.get.mockResolvedValueOnce({ data: { error: { info: "Request quota exceeded" } } });
  renderFrontPage();
  expect(await screen.findByRole("alert")).toHaveTextContent("Request quota exceeded");
});
