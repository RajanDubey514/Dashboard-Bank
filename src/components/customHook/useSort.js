import { useState } from "react";

export const useSort = (data = []) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;

    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const onSort = (key) => {
    let direction =
      sortConfig.key === key && sortConfig.direction === "asc"
        ? "desc"
        : "asc";

    setSortConfig({ key, direction });
  };

  return { sortedData, sortConfig, onSort };
};