import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  removeSelectedProduct,
  selectedProduct,
} from "../../redux/actions/productActions";

const ProductDetails = () => {
  let navigate = useNavigate();
  const product = useSelector((state) => state.product);
  const { thumbnail, title, price, category, description, discountPercentage } =
    product;
  const { productId } = useParams();
  const dispatch = useDispatch();

  const fetchProductDetails = async () => {
    const response = await axios
      .get(`https://dummyjson.com/products/${productId}`)
      .catch((err) => {
        console.log("err", err);
      });
    dispatch(selectedProduct(response.data));
  };

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    }
    if (productId && productId !== "") fetchProductDetails();
    dispatch(removeSelectedProduct());
  }, [productId]);

  return (
    <div className="ui grid container center aligned">
      {Object.keys(product).length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div className="ui segment two column stackable center aligned grid">
          <div className="ui vertical divider">
            <p className="ui red label">{discountPercentage} % OFF</p>
          </div>
          <div className="middle aligned row">
            <div className="column lp">
              <img
                className="ui fluid centered medium image"
                src={thumbnail}
                alt="product"
              />
            </div>
            <div className="column rp">
              <h1>{title}</h1>
              <h2>
                <a className="ui teal tag label">${price}</a>
              </h2>
              <h3>
                <a className="ui brown block header">{category}</a>
              </h3>
              <p>{description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
