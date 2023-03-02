import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import "@testing-library/jest-dom";
import Preference from "../helper/Preference";
import axios from "axios";

const mockStore = configureMockStore([]);

jest.mock("axios");
jest.mock("react-router-dom", () => {
  const module = jest.requireActual("react-router-dom");
  return {
    ...module,
    useNavigate: jest.fn(),
  };
});

describe("Preference Page Component", () => {
  //TEST 1
  test("check preference page form and submit preferences", async () => {
    const store = mockStore({
      userStatus: {
        userEmail: "abc@abc",
      },
    });

    axios.post.mockResolvedValue({ data: true });
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    const { getByText, getAllByRole, getByDisplayValue } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Preference />
        </MemoryRouter>
      </Provider>
    );

    const title = getByText("Select Your Preferences");
    const selectElement = getAllByRole("combobox");
    const save = screen.getByRole("button");

    expect(title).toBeInTheDocument();
    expect(selectElement).toHaveLength(2);
    expect(save).toBeInTheDocument();

    fireEvent.change(selectElement[0], { target: { value: "apple" } });
    fireEvent.change(selectElement[1], { target: { value: "mobile" } });

    const selectedBrand = getByDisplayValue("Apple");
    const selectedCategory = getByDisplayValue("Mobile");

    expect(selectedBrand).toBeInTheDocument();
    expect(selectedCategory).toBeInTheDocument();

    fireEvent.click(save);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(navigate).toHaveBeenCalledWith("/");
    });
  });
});
