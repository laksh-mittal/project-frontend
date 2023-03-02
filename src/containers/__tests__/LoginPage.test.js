import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import LoginPage from "../login/LoginPage";
import "@testing-library/jest-dom";
import axios from "axios";

jest.mock("axios");
jest.mock("react-router-dom", () => {
  const module = jest.requireActual("react-router-dom");
  return {
    ...module,
    useNavigate: jest.fn(),
  };
});

const mockStore = configureMockStore([]);

describe("LoginPage component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      userStatus: {
        isLoggedIn: false,
      },
    });
  });

  //TEST 1
  test("check login form button and input fields", async () => {
    axios.post.mockResolvedValue({ data: { result: false } });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const email = screen.getByPlaceholderText("E-mail address");
    const password = screen.getByPlaceholderText("Password");
    const login = screen.getByRole("button");

    expect(email).toBeInTheDocument(1);
    expect(password).toBeInTheDocument(1);
    expect(login).toBeInTheDocument(1);
  });

  //TEST 2

  test("submit login form with invalid user", async () => {
    axios.post.mockResolvedValue({ data: { result: false } });

    const { getByText } = render(
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

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(getByText("Incorrect email or password")).toBeInTheDocument();
    });
  });

  //TEST 3

  test("submit login form with valid user", async () => {
    axios.post.mockResolvedValue({ data: { result: true } });
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    render(
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
    fireEvent.change(password, { target: { value: "correctpassword" } });
    fireEvent.click(login);

    store.getState().userStatus.isLoggedIn = true;

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(navigate).toHaveBeenCalledWith("/");
    });
  });

  //TEST 4

  test("switch to register tab, check register form components, click submit, check register failed message", async () => {
    axios.post.mockResolvedValue({ data: { response: false } });

    //render the component
    const { getByText } = render(
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

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(
        getByText("An account with this email already exists!")
      ).toBeInTheDocument();
    });
  });

  //TEST 5

  test("switch to register tab, check register form components, click submit, navigate to preference page", async () => {
    axios.post.mockResolvedValue({
      data: { response: true, email: "test@example.com" },
    });
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

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
    fireEvent.change(password, { target: { value: "password" } });
    fireEvent.click(register);

    store.getState().userStatus.userEmail = "test@example.com";
    // store.dispatch({
    //   type: "LOGIN",
    //   payload: { userStatus: { userEmail: "test@example.com" } },
    // });
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(navigate).toHaveBeenCalledWith("/preference");
      // expect(store.getState().userStatus.userEmail).toBe("test@example.com");
    });
  });
});
