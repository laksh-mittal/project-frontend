import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import "@testing-library/jest-dom";
import Pagination from "../helper/Pagination";

const mockStore = configureMockStore([]);

describe("Pagination Component", () => {
  //TEST 1
  test("count number of pages", () => {
    const store = mockStore({
      userStatus: {
        isLoggedIn: true,
        userEmail: "abc@abc",
        brand: "apple",
        category: "home",
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Pagination totalCards={25} cardsPerPage={8} currentPage={1} />
        </MemoryRouter>
      </Provider>
    );

    const pages = document.querySelectorAll("a");
    expect(pages).toHaveLength(4);
  });

  //TEST 2
  test("check for first page as active/current page", () => {
    const store = mockStore({
      userStatus: {
        isLoggedIn: true,
        userEmail: "abc@abc",
        brand: "apple",
        category: "home",
      },
    });

    const currentPage = 2;

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Pagination
            totalCards={25}
            cardsPerPage={8}
            currentPage={currentPage}
          />
        </MemoryRouter>
      </Provider>
    );

    const pages = document.querySelectorAll("a");
    const firstPage = pages[currentPage - 1];
    expect(pages).toHaveLength(4);
    expect(firstPage).toHaveClass("active");
  });
});
