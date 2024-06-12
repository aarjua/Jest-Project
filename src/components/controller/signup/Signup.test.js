import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Signup from "./Signup";

describe("Signup", () => {
  test("test labeltext should be present", () => {
    const { getByLabelText } = render(<Signup />);

    expect(getByLabelText(/Full Name/i)).toBeInTheDocument();
  });

  test("test by id name should be true", () => {
    const { getByTestId } = render(<Signup />);
    screen.logTestingPlaygroundURL();
    screen.debug();
    expect(getByTestId(/name/i)).not.toBeRequired();
  });
  test("test display value should be valid type for textbox", () => {
    const { getByLabelText, getByDisplayValue } = render(<Signup />);

    // Type a value into the input field
     userEvent.type(getByLabelText(/Full Name/i), "John Doe");

    // Use getByDisplayValue to find the input with the specific value
    expect(getByDisplayValue("John Doe")).toBeInTheDocument();
  });

  test("test display value should be valid type for selectbox", async () => {
    const { getByTestId } = render(<Signup />);
    const select = getByTestId("selectbox");

    select.value = 2;
    select.dispatchEvent(new Event("change"));

    expect(select.value).toBe(2);
  });
});
