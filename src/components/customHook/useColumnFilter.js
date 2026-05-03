import { useState } from "react";

export const useColumnFilter = (data = []) => {
  const [columnSearchKeys, setColumnSearchKeys] = useState({});

  const applyFilters = (keysObj) => {
    let result = [...data];

    Object.keys(keysObj).forEach((col) => {
      const keys = keysObj[col];
      if (keys?.length > 0) {
        result = result.filter((row) =>
          keys.every((key) =>
            String(row[col] || "")
              .toLowerCase()
              .includes(key.toLowerCase())
          )
        );
      }
    });

    return result;
  };

  const handleColumnSearch = (header, keys) => {
    const updated = { ...columnSearchKeys, [header]: keys };
    setColumnSearchKeys(updated);
    return applyFilters(updated);
  };

  const removeColumnFilter = (column) => {
    const updated = { ...columnSearchKeys };
    delete updated[column];
    setColumnSearchKeys(updated);
    return applyFilters(updated);
  };

  return {
    columnSearchKeys,
    handleColumnSearch,
    removeColumnFilter,
  };
};