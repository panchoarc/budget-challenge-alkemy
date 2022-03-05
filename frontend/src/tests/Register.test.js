import "@testing-library/jest-dom";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Register from "../pages/Register";
import { fireEvent, render, screen } from "./test-utils";

const setup = () => render(<Register />);
describe("<Register> component", () => {
  test("Clicking the register button and show all the fields validations", async () => {
    setup();
    const button = screen.getByText("Register");
    fireEvent.click(button);

    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/password is required/i)
    ).toBeInTheDocument();
  });

  test("should shown a warning message above fields when a fields doesn't suit validations", async () => {
    setup();

    /** Getting elements, buttons and inputs */
    const button = screen.getByText("Register");
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    /** Filling the inputs */
    userEvent.type(nameInput, "John Doe");
    userEvent.type(emailInput, "example202example.com");
    userEvent.type(passwordInput, "1234");

    /** Clicking the button */
    fireEvent.click(button);

    /** Waiting for the error message to be shown */
    await waitFor(() => {
      expect(screen.getByText(/Invalid email format/i)).toBeInTheDocument();
    });
    expect(
      screen.getByText(/password must be at least 6 characters/i)
    ).toBeInTheDocument();
  });

  test("should show a warning message above input when you tried to put numbers in a only text field", async () => {
    setup();

    /** Getting elements, buttons and inputs */
    const button = screen.getByText("Register");
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    /** Filling the inputs */
    userEvent.type(nameInput, "123456");
    userEvent.type(emailInput, "example20@example.com");
    userEvent.type(passwordInput, "123456");

    /** Clicking the button */
    fireEvent.click(button);

    /** Waiting for the error message to be shown */
    await waitFor(() => {
      expect(
        screen.getByText(/Only alphabets are allowed for this field/i)
      ).toBeInTheDocument();
    });
  });

  test("should show a error message with the legend user already exists", async () => {
    setup();

    /** Getting elements, buttons and inputs */
    const button = screen.getByText("Register");
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    /** Filling the inputs */
    userEvent.type(nameInput, "John Doe");
    userEvent.type(emailInput, "example20@example.com");
    userEvent.type(passwordInput, "123456");

    /** Clicking the button */
    userEvent.click(button);
    /** Waiting for the error message to be shown */
    await waitFor(() => {
      expect(screen.getByText(/User already exists/i)).toBeInTheDocument();
    });
  });

  test("should shown a successfull message with the legend user created successfully", async () => {
    setup();

    /** Getting elements, buttons and inputs */
    const button = screen.getByText("Register");
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    /** Filling the inputs */
    userEvent.type(nameInput, "John Doe");
    userEvent.type(emailInput, "example1@example.com");
    userEvent.type(passwordInput, "123456");

    /** Clicking the button */

    fireEvent.click(button);

    /** Waiting for the error message to be shown */
    await waitFor(() => {
      expect(
        screen.getByText(/User created successfully/i)
      ).toBeInTheDocument();
    });
  });
});
