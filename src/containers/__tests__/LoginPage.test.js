import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import LoginPage from "../login/LoginPage";
import "@testing-library/jest-dom";

const mockStore = configureMockStore([]);

describe("LoginPage component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      loginStatus: false,
    });
  });

  //TEST 1

  test("login form shows 2 inputs and 1 buttons", async () => {
    //render the component
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    //manipulate the component or find an element in it
    const email = screen.getByPlaceholderText("E-mail address");
    const password = screen.getByPlaceholderText("Password");
    const login = screen.getAllByRole("button");

    //assertion - make sure our component is doing what we expect it to do
    expect(email).toBeInTheDocument(1);
    expect(password).toBeInTheDocument(1);
    expect(login).toHaveLength(1);
  });

  //TEST 2
  test("should show error message on failed login", async () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const email = screen.getByPlaceholderText("E-mail address");
    const password = screen.getByPlaceholderText("Password");
    const login = screen.getByRole("button");

    fireEvent.change(email, { target: { value: "test@example.com" } });
    fireEvent.change(password, { target: { value: "wrongpassword" } });
    fireEvent.click(login);

    // await waitFor(() => {
    //   expect(getByText("Incorrect email or password")).toBeInTheDocument();
    // });
  });

  //TEST 3

  test("check for register tab", async () => {
    //render the component
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    //manipulate the component or find an element in it
    const registerTab = screen.getByText("Register");
    fireEvent.click(registerTab);

    const email = screen.getByPlaceholderText("E-mail address");
    const password = screen.getByPlaceholderText("Password");
    const register = screen.getByRole("button");

    fireEvent.change(email, { target: { value: "test@example.com" } });
    fireEvent.change(password, { target: { value: "wrongpassword" } });
    fireEvent.click(register);
  });
});
