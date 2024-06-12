import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./Home";

describe("Home", () => {
  test("home test", () => {
    const { getByAltText, getByText } = render(<Home />);

    expect(getByAltText("app-logo")).toBeInTheDocument();

    expect(getByText(/learn react/i)).toBeInTheDocument();

    expect(getByText(/save to reload/i)).toBeInTheDocument();
  });
});
