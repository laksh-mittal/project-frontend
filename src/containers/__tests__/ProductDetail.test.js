import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ProductDetails from "../product/ProductDetail";
import "@testing-library/jest-dom";

describe("ProductDetails component", () => {
  const mockStore = configureStore();

  //TEST 1
  test("product page when no product is selected display loading...", () => {
    const store = mockStore({
      userStatus: {
        isLoggedIn: true,
        userEmail: "abc@abc",
        brand: "apple",
        category: "home",
      },
      product: {},
    });
    // axios.get.mockResolvedValueOnce({ data: product });

    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductDetails />
        </MemoryRouter>
      </Provider>
    );

    expect(getByText("Loading...")).toBeInTheDocument();
  });

  //TEST 2
  test("product page when a product is selected", () => {
    const store = mockStore({
      userStatus: {
        isLoggedIn: true,
        userEmail: "abc@abc",
        brand: "apple",
        category: "home",
      },
      product: {
        thumbnail: "http://dummyimage.com",
        title: "Product Title",
        price: 50,
        category: "Category",
        description: "Product Description",
        discountPercentage: 10,
      },
    });

    const product = store.getState().product;

    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/product/${product.id}`]}>
          <ProductDetails />
        </MemoryRouter>
      </Provider>
    );

    expect(getByText(product.title)).toBeInTheDocument();
    expect(getByText(`$${product.price}`)).toBeInTheDocument();
    expect(getByText(product.category)).toBeInTheDocument();
    expect(getByText(product.description)).toBeInTheDocument();
    expect(
      getByText(`${product.discountPercentage} % OFF`)
    ).toBeInTheDocument();
  });
});
