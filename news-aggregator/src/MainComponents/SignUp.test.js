import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SignUp from "./SignUp";

function renderSignUp() {
  return render(
    <MemoryRouter>
      <SignUp />
    </MemoryRouter>
  );
}

it("renders without crashing", function () {
  renderSignUp();
});

it("matches snapshot", function () {
  const { asFragment } = renderSignUp();
  expect(asFragment()).toMatchSnapshot();
});

test("testing component", () => {
  const { getByText } = renderSignUp();
  getByText("Please SignUp");
});

test("sign up button works", () => {
  const { getByText } = renderSignUp();
  const btn = getByText("Sign In");
  expect(btn).toHaveClass("preferences");

  fireEvent.click(getByText("Sign In"));
  expect(btn).toBeInTheDocument();
});
