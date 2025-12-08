import React from "react";

const Pagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
  totalRecords,
  rowsPerPage,
  setRowsPerPage,
}) => {
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  const handleRowsChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const isTooManyPages = totalPages > 5;
  const startPage = Math.max(currentPage - 1, 1);
  const endPage = Math.min(currentPage + 1, totalPages);

  // Tailwind + CSS Variables
  const baseBtn =
    "text-xs px-2 py-1 rounded-md border transition-all duration-200";

  const filledBtn =
    "text-[var(--btn-text-color)] bg-[var(--btn-primary-bg)] border-[var(--btn-primary-bg)] hover:bg-[var(--btn-primary-hover)] hover:-translate-y-0.5";

  const outlineBtn =
    "text-[var(--btn-primary-bg)] border-[var(--btn-primary-bg)] hover:bg-[var(--btn-primary-bg)] hover:text-[var(--btn-text-color)] hover:-translate-y-0.5";

  return (
    <div className="flex flex-col items-center space-y-2 mt-3 text-center text-xs">

      {/* === Pagination Buttons === */}
      <div className="flex flex-wrap gap-1 justify-center items-center">

        {/* Prev */}
        <button
          className={`${baseBtn} ${outlineBtn} disabled:opacity-40 disabled:hover:translate-y-0`}
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Prev
        </button>

        {/* First */}
        <button
          className={`${baseBtn} ${
            currentPage === 1 ? filledBtn : outlineBtn
          }`}
          onClick={() => handlePageChange(1)}
        >
          1
        </button>

        {/* Left Ellipsis */}
        {isTooManyPages && currentPage > 3 && (
          <span className="text-xs">...</span>
        )}

        {/* Middle Pages */}
        {Array.from(
          { length: endPage - startPage + 1 },
          (_, i) => startPage + i
        )
          .filter((p) => p > 1 && p < totalPages)
          .map((page) => (
            <button
              key={page}
              className={`${baseBtn} ${
                currentPage === page ? filledBtn : outlineBtn
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}

        {/* Right Ellipsis */}
        {isTooManyPages && currentPage < totalPages - 2 && (
          <span className="text-xs">...</span>
        )}

        {/* Last */}
        {totalPages > 1 && (
          <button
            className={`${baseBtn} ${
              currentPage === totalPages ? filledBtn : outlineBtn
            }`}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>
        )}

        {/* Next */}
        <button
          className={`${baseBtn} ${outlineBtn} disabled:opacity-40 disabled:hover:translate-y-0`}
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
      {/* === Rows & Info === */}
      <div className="w-full max-w-xs flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[var(--color-text-light)]">

        {/* Rows Selector */}
        <div className="flex items-center gap-1">
          <span>Rows per page:</span>

          <select
            value={rowsPerPage}
            onChange={handleRowsChange}
            className="
              text-xs px-2 py-1 border rounded-md bg-white 
              border-[var(--btn-primary-bg)] 
              focus:outline-none focus:ring-1 focus:ring-[var(--btn-primary-hover)]
            "
          >
            {[2, 5, 20, 50].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {/* Pagination info */}
        <div className="text-xs">
          Page <b>{currentPage}</b> of <b>{totalPages}</b> — Total{" "}
          <b>{totalRecords}</b> records
        </div>
      </div>

    </div>
  );
};

export default Pagination;

