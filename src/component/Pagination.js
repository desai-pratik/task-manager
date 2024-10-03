import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount, handlePageClick }) => {
  return (
    <ReactPaginate
      previousLabel={<span className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition duration-200">Previous</span>}
      nextLabel={<span className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition duration-200">Next</span>}
      breakLabel={<span className="mx-2">...</span>}
      breakClassName={"break-me"}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      containerClassName={"flex justify-center items-center mt-4"}
      pageClassName={"mx-1"}
      pageLinkClassName={"px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition duration-200"}
      activeClassName={"bg-gray-900 text-gray-500"}
      previousClassName={"mx-1"}
      nextClassName={"mx-1"}
      disabledClassName={"opacity-50 cursor-not-allowed"}
    />
  );
};

export default Pagination;
