import { useEffect, useState } from "react";

export const useFilter = ({ data = [], filterType, searchQuery, filterConfig = [] }) => {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    let updated = [...data];

    // 🔹 Apply Filter
    const selectedFilter = filterConfig.find(f => f?.value === filterType);
    if (selectedFilter) {
      updated = updated.filter(selectedFilter.filterFn);
    }

    // 🔹 Apply Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      updated = updated.filter(item =>
        Object.values(item).some(
          val =>
            typeof val === "string" &&
            val.toLowerCase().includes(q)
        )
      );
    }

    setFilteredData(updated);
  }, [data, filterType, searchQuery, filterConfig]);

  return filteredData;
};