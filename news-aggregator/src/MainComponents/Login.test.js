import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";

function renderLogin() {
  return render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
}

it("renders without crashing", function () {
  renderLogin();
});

it("matches snapshot", function () {
  const { asFragment } = renderLogin();
  expect(asFragment()).toMatchSnapshot();
});

test("testing component", () => {
  const { getByText } = renderLogin();
  getByText("Please Login");
});

test("login button works", () => {
  const { getByText } = renderLogin();
  const heading = getByText("Log In");
  expect(heading).toHaveClass("preferences");
  fireEvent.click(getByText("Log In"));
  expect(heading).toBeInTheDocument();
});
