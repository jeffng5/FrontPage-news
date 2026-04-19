import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import FrontPage from "./FrontPage";

jest.mock("jwt-decode", () => ({
  jwtDecode: jest.fn(() => ({})),
}));

const newsApiArticle = {
  title: "Test headline",
  url: "https://example.com/a",
  description: "Test description",
  urlToImage: "",
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
  /* Empty search term so FrontPage runs topic APIs (not only everything-search). */
  localStorage.removeItem("freePreferences");
  jest.spyOn(axios, "get").mockResolvedValue({
    data: { articles: [newsApiArticle] },
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

it("matches snapshot", async function () {
  const view = renderFrontPage();
  expect(await screen.findByText("Test headline")).toBeInTheDocument();
  expect(view.asFragment()).toMatchSnapshot();
});

test("testing component", async () => {
  renderFrontPage();
  expect(await screen.findByText("Preferences")).toBeInTheDocument();
});
