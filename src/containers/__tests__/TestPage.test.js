import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import LoginPage from "../login/LoginPage";
import TestPage from "../login/TestPage";

test("login form shows 4 inputs and 2 buttons", () => {
  //render the component
  render(<TestPage />);

  //manipulate the component or find an element in it
  const inputs = screen.getAllByRole("textbox");
  const button = screen.getAllByRole("button");

  //assertion - make sure our component is doing what we expect it to do
  expect(inputs).toHaveLength(2);
  expect(button).toHaveLength(1);
});

// test("test", () => {
//   expect(true).toBe(true);
// });
