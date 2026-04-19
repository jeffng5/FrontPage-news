import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Welcome from "./Welcome";

function renderWelcome() {
  return render(
    <MemoryRouter>
      <Welcome />
    </MemoryRouter>
  );
}

it("renders without crashing", function () {
  renderWelcome();
});

it("matches snapshot", function () {
  const { asFragment } = renderWelcome();
  expect(asFragment()).toMatchSnapshot();
});

test("testing component", () => {
  const { getByText } = renderWelcome();
  getByText("YourFrontPageNews.com");
});
