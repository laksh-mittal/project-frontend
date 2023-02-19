import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Pagination from "../helper/Pagination";

const ProductComponent = () => {
  const products = useSelector((state) => state.allProducts.products);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(8);
  const searchTerm = useSelector((state) => state.searchTerm.searchTerm);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  const filteredProducts = products.filter((val) => {
    if (searchTerm == "") {
      return val;
    } else if (
      val.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      val.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      val.brand.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return val;
    }
  });
  const currentCards = filteredProducts.slice(
    indexOfFirstCard,
    indexOfLastCard
  );

  const renderList = currentCards.map((product) => {
    const { id, title, thumbnail, price, category } = product;
    return (
      <div className="column" key={id}>
        <Link to={`/product/${id}`}>
          <div className="ui link card">
            <div className="ui centered image">
              <img
                src={thumbnail}
                alt={title}
                style={{ height: "220px", width: "200px" }}
              />
            </div>
            <div className="header">{title}</div>
            <div className="ui teal label">$ {price}</div>
            <div className="meta">{category}</div>
          </div>
        </Link>
      </div>
    );
  });

  return (
    <div>
      <div className="ui cards center aligned grid">
        <div className="doubling stackable four column ui grid container">
          {renderList}
        </div>
      </div>
      {filteredProducts.length == 0 ? (
        <h2>No Results Found!</h2>
      ) : (
        <Pagination
          totalCards={filteredProducts.length}
          cardsPerPage={cardsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default ProductComponent;
