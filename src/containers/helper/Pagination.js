import React from "react";
const Pagination = ({
  totalCards,
  cardsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const pages = [];
  const totalPages = Math.ceil(totalCards / cardsPerPage);

  if (currentPage > totalPages || totalPages == 0) {
    setCurrentPage(1);
  }

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  return (
    <div className="ui pagination menu">
      {pages.map((page, index) => {
        return (
          <a
            className={page == currentPage ? "active item" : "item"}
            key={index}
            onClick={() => {
              setCurrentPage(page);
            }}
          >
            {page}
          </a>
        );
      })}
    </div>
  );
};

export default Pagination;
