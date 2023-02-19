import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductComponent from "./ProductComponent";
import { setProduct } from "../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const ProductListing = () => {
  let navigate = useNavigate();
  const brand = useSelector((state) => state.userStatus.brand);
  const category = useSelector((state) => state.userStatus.category);
  const userStatus = useSelector((state) => state.userStatus.isLoggedIn);
  const dispatch = useDispatch();
  const fetchProducts = async () => {
    const response = await axios
      .get("https://dummyjson.com/products")
      .catch((err) => {
        console.log("Err", err);
      });
    const productList = response.data.products;
    productList.sort((a, b) => {
      if (
        (a.brand.toLowerCase().includes(brand) &&
          !b.brand.toLowerCase().includes(brand)) ||
        (a.category.toLowerCase().includes(category) &&
          !b.category.toLowerCase().includes(category))
      ) {
        return -1;
      }
      if (
        (!a.brand.toLowerCase().includes(brand) &&
          b.brand.toLowerCase().includes(brand)) ||
        (!a.category.toLowerCase().includes(category) &&
          b.category.toLowerCase().includes(category))
      ) {
        return 1;
      }
    });

    dispatch(setProduct(productList));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode(token);
      const expirationTime = decodedToken.exp * 1000;
      const currentTime = new Date().getTime();
      if (currentTime > expirationTime) {
        localStorage.removeItem("token");
        dispatch({ type: "LOGOUT", payload: false });
        navigate("/login");
      } else {
        const timeout = expirationTime - currentTime;
        setTimeout(() => {
          localStorage.removeItem("token");
          dispatch({ type: "LOGOUT", payload: false });
          navigate("/login");
        }, timeout);
      }
    } else {
      navigate("/login");
    }

    fetchProducts();
  }, [brand, category]);

  return (
    <div className="ui grid container center aligned">
      <ProductComponent />
    </div>
  );
};

export default ProductListing;
