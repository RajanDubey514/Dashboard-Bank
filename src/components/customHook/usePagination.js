import { useMemo } from "react";

export const usePagination = (data = [], currentPage, rowsPerPage) => {
  const paginatedData = useMemo(() => {
    return data.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    );
  }, [data, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  return { paginatedData, totalPages };
};