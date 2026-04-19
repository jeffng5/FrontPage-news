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
