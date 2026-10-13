import React from "react";
import { render, fireEvent, screen, waitFor, act } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Preferences from "./Preferences";
import FrontPage from "../FrontPage";

jest.mock("jwt-decode", () => ({ jwtDecode: jest.fn(() => ({})) }));

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem("token", "mock-token");
  localStorage.setItem("username", "tester");
  jest.spyOn(axios, "get").mockResolvedValue({ data: { data: [] } });
});

afterEach(() => jest.restoreAllMocks());

function renderPreferences() {
  render(
    <MemoryRouter initialEntries={["/users"]}>
      <Routes>
        <Route path="/users" element={<Preferences />} />
        <Route path="/users/frontpage" element={<FrontPage />} />
      </Routes>
    </MemoryRouter>
  );
}

test("uses the typed term without clicking Save Preferences", async () => {
  renderPreferences();
  fireEvent.change(screen.getByRole("textbox"), {
    target: { value: "  climate & energy  " },
  });
  const showNews = screen.getByRole("button", { name: "See Front Page News" });
  expect(showNews).toHaveAttribute("type", "button");
  await act(async () => {
    fireEvent.click(showNews);
  });

  await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
  const params = new URL(axios.get.mock.calls[0][0]).searchParams;
  expect(params.get("keywords")).toBe("climate & energy");
  expect(params.get("languages")).toBe("en");
});

test("Save Preferences retains the current term and restores it on return", async () => {
  localStorage.setItem("freePreferences", "old term");
  renderPreferences();
  fireEvent.change(screen.getByRole("textbox"), {
    target: { value: "  science  " },
  });
  fireEvent.click(screen.getByRole("button", { name: "Save Preferences" }));
  expect(localStorage.getItem("freePreferences")).toBe("science");
  await act(async () => {
    fireEvent.click(screen.getByRole("button", { name: "See Front Page News" }));
  });
  fireEvent.click(screen.getByRole("link", { name: "Preferences" }));
  expect(screen.getByRole("textbox")).toHaveValue("science");
});

test("clearing a saved term skips search requests", () => {
  localStorage.setItem("freePreferences", "old term");
  renderPreferences();
  fireEvent.change(screen.getByRole("textbox"), { target: { value: "" } });
  fireEvent.click(screen.getByRole("button", { name: "Save Preferences" }));
  expect(localStorage.getItem("freePreferences")).toBe("");
  fireEvent.click(screen.getByRole("button", { name: "See Front Page News" }));
  expect(axios.get).not.toHaveBeenCalled();
});

test("saving without a term replaces the legacy null value with blank", () => {
  localStorage.setItem("freePreferences", "null");
  renderPreferences();
  expect(screen.getByRole("textbox")).toHaveValue("");
  fireEvent.click(screen.getByRole("button", { name: "Save Preferences" }));
  expect(localStorage.getItem("freePreferences")).toBe("");
});
