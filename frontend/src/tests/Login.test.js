import "@testing-library/jest-dom";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Login from "../pages/Login";
import { fireEvent, render, screen } from "./test-utils";

const setup = () => render(<Login />);
const token = process.env.REACT_APP_TOKEN_TEST;

describe("<Login> component", () => {
  test("Clicking the login button and show all the fields validations", async () => {
    setup();
    const button = screen.getByRole("button", { name: /login/i });
    fireEvent.click(button);

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/password is required/i)
    ).toBeInTheDocument();
  });

  test("should shown a warning message above fields when a fields doesn't suit validations", async () => {
    setup();

    /** Getting elements, buttons and inputs */
    const button = screen.getByRole("button", { name: /login/i });
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    /** Filling the inputs */
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

  test("should show a error message with the legend user doesn't exist", async () => {
    setup();

    /** Getting elements, buttons and inputs */
    const button = screen.getByRole("button", { name: /login/i });
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    /** Filling the inputs */
    userEvent.type(emailInput, "example02@example.com");
    userEvent.type(passwordInput, "123456");

    /** Clicking the button */
    userEvent.click(button);

    /** Waiting for the error message to be shown */
    await waitFor(() => {
      expect(screen.getByText(/User does not exist/i)).toBeInTheDocument();
    });
  });

  test("should show a error message with the legend invalid credentials", async () => {
    setup();

    /** Getting elements, buttons and inputs */
    const button = screen.getByRole("button", { name: /login/i });
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    /** Filling the inputs */
    userEvent.type(emailInput, "example20@example.com");
    userEvent.type(passwordInput, "123456890");

    /** Clicking the button */
    userEvent.click(button);

    /** Waiting for the error message to be shown */
    await waitFor(() => {
      expect(screen.getByText(/Invalid Credentials/i)).toBeInTheDocument();
    });
  });

  test("should login with the right credentials", async () => {
    setup();

    /** Getting elements, buttons and inputs */
    const button = screen.getByRole("button", { name: /login/i });
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    /** Filling the inputs */
    userEvent.type(emailInput, "example20@example.com");
    userEvent.type(passwordInput, "123456");

    /** Clicking the button */
    userEvent.click(button);

    await waitFor(() => {
      //console.log(localStorage.getItem("token"));
      expect(localStorage.getItem("token")).toBe(token);
    });
  });
});
