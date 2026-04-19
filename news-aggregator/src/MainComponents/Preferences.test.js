import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Preferences from "./Preferences";

jest.mock("jwt-decode", () => ({
  jwtDecode: jest.fn(() => ({})),
}));

function renderPreferences() {
  localStorage.setItem("token", "mock-token");
  localStorage.setItem("username", "tester");
  return render(
    <MemoryRouter>
      <Preferences />
    </MemoryRouter>
  );
}

beforeEach(() => {
  localStorage.clear();
  window.alert = jest.fn();
});

it("renders without crashing", function () {
  renderPreferences();
});

it("matches snapshot", function () {
  const { asFragment } = renderPreferences();
  expect(asFragment()).toMatchSnapshot();
});

test("testing component", () => {
  const { getByText } = renderPreferences();
  getByText("Preferences");
});

test("save preference persists topics after checkbox + save", () => {
  renderPreferences();
  const saveBtn = screen.getByRole("button", { name: /save preferences/i });
  expect(saveBtn).toHaveClass("preferences");

  fireEvent.click(screen.getByRole("checkbox", { name: /U\.S\./i }));
  fireEvent.click(saveBtn);

  expect(localStorage.getItem("preferences")).toBe("US");
  expect(window.alert).not.toHaveBeenCalled();
});

test("save without selection shows alert", () => {
  renderPreferences();
  fireEvent.click(screen.getByRole("button", { name: /save preferences/i }));
  expect(window.alert).toHaveBeenCalled();
});

test("see FrontPageNews", () => {
  const { getByText } = renderPreferences();
  const heading = getByText("See Front Page News");
  expect(heading).toHaveClass("save");
  fireEvent.click(getByText("See Front Page News"));
  expect(heading).toBeInTheDocument();
});
