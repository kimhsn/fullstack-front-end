import React from "react";
import "./Paginate.css";
const Paginate = ({
  elementsPerPage,
  totalElements,
  currentPage,
  paginate,
  previousPage,
  nextPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalElements / elementsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="pagination-container">
      <ul className="pagination">
        <li onClick={previousPage} className="page-number">
          Précédent
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            onClick={() => paginate(number)}
            className={
              "page-number " + (number === currentPage ? "active" : "")
            }
          >
            {number}
          </li>
        ))}
        <li onClick={nextPage} className="page-number">
          Suivant
        </li>
      </ul>
    </div>
  );
};

export default Paginate;
