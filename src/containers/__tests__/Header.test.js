import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Header from "../header/Header";
import "@testing-library/jest-dom";

jest.mock("react-router-dom", () => {
  const module = jest.requireActual("react-router-dom");
  return {
    ...module,
    useNavigate: jest.fn(),
  };
});

const mockStore = configureMockStore([]);

describe("Header Component", () => {
  //TEST 1
  test("check header before login", () => {
    const store = mockStore({
      userStatus: {
        isLoggedIn: false,
        userEmail: "",
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    const title = getByText("Project");

    expect(title).toBeInTheDocument();
  });

  //TEST 2
  test("check header after login", () => {
    const store = mockStore({
      userStatus: {
        isLoggedIn: true,
        userEmail: "abc@abc",
        brand: "apple",
        category: "home",
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    const title = getByText("Project");
    const userName = getByText(/Welcome /i);
    const preference = screen.getByRole("button");
    const search = screen.getByPlaceholderText("Search...");
    const logout = getByText("Logout");

    expect(title).toBeInTheDocument();
    expect(userName).toBeInTheDocument();
    expect(preference).toBeInTheDocument();
    expect(search).toBeInTheDocument();
    expect(logout).toBeInTheDocument();
  });

  //TEST 3
  test("click preference button and test preference modal", () => {
    const store = mockStore({
      userStatus: {
        isLoggedIn: true,
        userEmail: "abc@abc",
        brand: "apple",
        category: "home",
      },
    });

    const { getByText, getAllByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    const preference = screen.getByRole("button");
    fireEvent.click(preference);

    const title = getByText("Select Preferences");
    const selectElement = getAllByRole("combobox");
    const save = screen.getByText("Save");

    expect(title).toBeInTheDocument();
    expect(selectElement).toHaveLength(2);
    expect(save).toBeInTheDocument();
  });

  //TEST 4
  test("click logout button and navigate to login page", async () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    const store = mockStore({
      userStatus: {
        isLoggedIn: true,
        userEmail: "abc@abc",
        brand: "apple",
        category: "home",
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    const logout = getByText("Logout");
    fireEvent.click(logout);

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("/login");
    });
  });
});
