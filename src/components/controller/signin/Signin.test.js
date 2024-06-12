import React from 'react';
import { render, screen } from "@testing-library/react";
import Signin from "./Signin";
import { act } from "react";

describe("Signin", () => {
  test("Signin test", async () => {
    await act(async () => {
    render(<Signin />);
    })
    const getByText = screen.getByRole("textbox");
    expect(getByText).toBeInTheDocument()
  });
});