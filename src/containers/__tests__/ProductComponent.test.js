import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import ProductComponent from "../product/ProductComponent";
import { MemoryRouter, useNavigate } from "react-router-dom";
import "@testing-library/jest-dom";

const mockStore = configureMockStore();

jest.mock("react-router-dom", () => {
  const module = jest.requireActual("react-router-dom");
  return {
    ...module,
    useNavigate: jest.fn(),
  };
});

let store;
beforeEach(() => {
  store = mockStore({
    allProducts: {
      products: [
        {
          id: 1,
          title: "Product 1",
          thumbnail: "image1.png",
          price: 10,
          category: "Category A",
          brand: "Brand A",
        },
        {
          id: 2,
          title: "Product 2",
          thumbnail: "image2.png",
          price: 20,
          category: "Category B",
          brand: "Brand B",
        },
        {
          id: 3,
          title: "Product 3",
          thumbnail: "image3.png",
          price: 30,
          category: "Category A",
          brand: "Brand C",
        },
        {
          id: 4,
          title: "Product 4",
          thumbnail: "image4.png",
          price: 40,
          category: "Category B",
          brand: "Brand D",
        },
        {
          id: 5,
          title: "Product 5",
          thumbnail: "image5.png",
          price: 50,
          category: "Category A",
          brand: "Brand D",
        },
        {
          id: 6,
          title: "Product 6",
          thumbnail: "image6.png",
          price: 10,
          category: "Category A",
          brand: "Brand A",
        },
        {
          id: 7,
          title: "Product 7",
          thumbnail: "image7.png",
          price: 20,
          category: "Category B",
          brand: "Brand B",
        },
        {
          id: 8,
          title: "Product 8",
          thumbnail: "image8.png",
          price: 30,
          category: "Category A",
          brand: "Brand C",
        },
        {
          id: 9,
          title: "Product 9",
          thumbnail: "image9.png",
          price: 40,
          category: "Category B",
          brand: "Brand D",
        },
        {
          id: 10,
          title: "Product 10",
          thumbnail: "image10.png",
          price: 50,
          category: "Category A",
          brand: "Brand D",
        },
      ],
    },
    searchTerm: { searchTerm: "" },
  });
});

describe("ProductComponent", () => {
  // TEST 1
  test("renders a list of products", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductComponent />
        </MemoryRouter>
      </Provider>
    );

    const linkElements = screen.getAllByRole("link");

    expect(linkElements.length).toBeLessThanOrEqual(8);

    linkElements.forEach((linkElement, index) => {
      //title
      expect(linkElement.querySelector(".header").textContent).toBe(
        store.getState().allProducts.products[index].title
      );
      //price
      expect(linkElement.querySelector(".ui.teal").textContent).toBe(
        "$ " + store.getState().allProducts.products[index].price
      );
      //category
      expect(linkElement.querySelector(".meta").textContent).toBe(
        store.getState().allProducts.products[index].category
      );
      //image src
      expect(linkElement.querySelector("img").src).toBe(
        "http://localhost/" +
          store.getState().allProducts.products[index].thumbnail
      );
    });
  });

  // TEST 2
  test("click page 2 via pagination and check cards", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductComponent />
        </MemoryRouter>
      </Provider>
    );

    const pageNumber = document.querySelectorAll(".item")[1];
    fireEvent.click(pageNumber);

    const linkElements = screen.getAllByRole("link");
    expect(linkElements).toHaveLength(2);

    linkElements.forEach((linkElement, index) => {
      //title
      expect(linkElement.querySelector(".header").textContent).toBe(
        store.getState().allProducts.products[index + 8].title
      );
      //price
      expect(linkElement.querySelector(".ui.teal").textContent).toBe(
        "$ " + store.getState().allProducts.products[index + 8].price
      );
      //category
      expect(linkElement.querySelector(".meta").textContent).toBe(
        store.getState().allProducts.products[index + 8].category
      );
      //image src
      expect(linkElement.querySelector("img").src).toBe(
        "http://localhost/" +
          store.getState().allProducts.products[index + 8].thumbnail
      );
    });
  });

  // TEST 3
  test("renders a list of products based on search term", () => {
    store.getState().searchTerm.searchTerm = "Category A";
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductComponent />
        </MemoryRouter>
      </Provider>
    );

    const linkElements = screen.getAllByRole("link");

    expect(linkElements).toHaveLength(
      store.getState().allProducts.products.filter((obj) => {
        return obj.category === "Category A";
      }).length
    );

    linkElements.forEach((linkElement) => {
      //category
      expect(linkElement.querySelector(".meta").textContent).toBe("Category A");
    });
  });

  //TEST 4
  test('renders a "No Results Found!" message if there are no matching products', () => {
    store.getState().searchTerm.searchTerm = "Non-existent Product";

    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductComponent />
        </MemoryRouter>
      </Provider>
    );

    const noResultsMessage = getByText("No Results Found!");

    expect(noResultsMessage).toBeInTheDocument();
  });

  //TEST 5
  test("clicking on a card", () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    const { getAllByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductComponent />
        </MemoryRouter>
      </Provider>
    );

    const linkElement = getAllByRole("link")[0];
    fireEvent.click(linkElement);

    waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("/product/1");
    });
  });
});
