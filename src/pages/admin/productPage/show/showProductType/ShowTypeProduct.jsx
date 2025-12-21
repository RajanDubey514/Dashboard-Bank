import React, { useEffect, useState } from "react";
import { PlusCircle , CircleX} from "lucide-react";
import Swal from "sweetalert2";

import ModalCom from "../../../../../components/modalComp/ModalCom";
import EditableTable from "../../../../../components/tablecomp/EditableTable";
import Pagination from "../../../../../components/pagination/Pagination";
import DownloadDataButton from "../../../../../components/DownloadData/DownloadDataButton";

import AddProductType from "../../../productPage/addProduct/AddProductType";
import EditProductType from "../../../productPage/updateProduct/EditProductType";
import { FakeProductTypeData } from "../../../../../components/FakeData";

// Common Components
import SelectBoxCommon from "../../../../../components/searchComp/SelectBoxCommon";

const ShowTypeProduct = () => {
  // 🔥 MAIN STATES
  const [dataList, setDataList] = useState([]);        // all data
  const [filteredData, setFilteredData] = useState([]); // filtered + searched result

  const [searchQuery, setSearchQuery] = useState("");   // search input
  const [filterType, setFilterType] = useState("all");  // filter dropdown

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null); // row to edit

  const [columnSearchKeys, setColumnSearchKeys] = useState({});
  

  // ----------------------------------------------------------------------
  // 🚀 LOAD INITIAL DATA
  // ----------------------------------------------------------------------
  useEffect(() => {
    setDataList(FakeProductTypeData);
    setFilteredData(FakeProductTypeData);
  }, []);

  // ----------------------------------------------------------------------
  // 🔍 FILTER + SEARCH LOGIC
  // ----------------------------------------------------------------------
 /** -------------------- FILTER + SEARCH -------------------- **/
    useEffect(() => {
      let updated = [...dataList];
  
      switch (filterType) {
        case "today":
          updated = updated.filter((item) => item.isNew === true);
          break;
        case "active":
          updated = updated.filter((item) => item.status === "Active");
          break;
        case "inactive":
          updated = updated.filter((item) => item.status === "Inactive");
          break;
        default:
          break; // "all"
      }
  
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        updated = updated.filter((item) =>
          Object.values(item).some(
            (val) => typeof val === "string" && val.toLowerCase().includes(q)
          )
        );
      }
  
      setFilteredData(updated);
      setCurrentPage(1);
    }, [filterType, searchQuery, dataList]);


  // ----------------------------------------------------------------------
  // ↕️ SORTING LOGIC
  // ----------------------------------------------------------------------
    const onSort = (key) => {
    let direction = sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });

    const sorted = [...filteredData].sort((a, b) =>
      a[key] < b[key] ? (direction === "asc" ? -1 : 1) :
      a[key] > b[key] ? (direction === "asc" ? 1 : -1) : 0
    );

    setFilteredData(sorted);
  };


  // ==============================
  // COLUMN SEARCH
  // ==============================
 const handleColumnSearch = (header, keys) => {
    const updated = { ...columnSearchKeys, [header]: keys };
    setColumnSearchKeys(updated);
    applyFilters(updated);
  };

  const applyFilters = (keysObj) => {
    let result = [...dataList];

    Object.keys(keysObj).forEach((col) => {
      const keys = keysObj[col];
      if (keys?.length > 0) {
        result = result.filter((row) =>
          keys.every((key) =>
            String(row[col] || "").toLowerCase().includes(key.toLowerCase())
          )
        );
      }
    });

    setFilteredData(result);
    setCurrentPage(1);
  };

    const removeColumnFilter = (column) => {
  const updatedKeys = { ...columnSearchKeys };
  delete updatedKeys[column]; // ❌ remove that column filter

  setColumnSearchKeys(updatedKeys);

  // Re-apply remaining column filters
  let result = [...dataList];

  Object.keys(updatedKeys).forEach((col) => {
    const keys = updatedKeys[col];
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

  setFilteredData(result);
  setCurrentPage(1);
};

  

  // ----------------------------------------------------------------------
  // ❌ DELETE ROW WITH CONFIRMATION
  // ----------------------------------------------------------------------
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This product type will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete it!",
    }).then((res) => {
      if (res.isConfirmed) {
        const updated = dataList.filter((item) => item.id !== id);
        setDataList(updated);
        setFilteredData(updated);

        Swal.fire("Deleted!", "Product type deleted successfully.", "success");
      }
    });
  };

  // ----------------------------------------------------------------------
  // 📄 PAGINATION
  // ----------------------------------------------------------------------
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const headers = filteredData.length > 0 ? Object.keys(filteredData[0]) : [];

  // ----------------------------------------------------------------------
  // 🟢 OPEN ADD MODAL
  // ----------------------------------------------------------------------
  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  // ----------------------------------------------------------------------
  // ✏️ OPEN EDIT MODAL
  // ----------------------------------------------------------------------
  const handleEditClick = (id) => {
    const selected = dataList.find((item) => item.id === id);
    setSelectedData(selected);
    setIsEditModalOpen(true);
  };

  // ----------------------------------------------------------------------
  // UI RENDER
  // ----------------------------------------------------------------------
  return (
    <div className="space-y-2 w-full">

      {/* ------------------------------------------------------------------ */}
      {/* 🔍 FILTER + SEARCH + ADD BUTTON */}
      {/* ------------------------------------------------------------------ */}

        {/* LEFT — Filter + Search */}
        <div className="">
          {/* Filter Select Box */}
          <SelectBoxCommon
            value={filterType}
             onChange={setFilterType}
             dataList={dataList} // pass full data for dynamic counts
          />
        </div>

      <div className="flex flex-col md:flex-row justify-end md:items-center gap-3">

        {/* RIGHT — Download + Add */}
        <div className="flex items-center gap-3">
          <DownloadDataButton data={dataList} fileName="Product Type Details" />

          <button
            onClick={handleAddClick}
            className="flex items-center gap-2 px-4 py-1 rounded-lg text-white text-xs font-semibold shadow transition-all duration-300 hover:shadow-lg"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            <PlusCircle size={12} />
            Add Product Type
          </button>
        </div>
      </div>

        {Object.keys(columnSearchKeys).length > 0 && (
                 <div className="flex gap-1 mb-1">
                {Object.entries(columnSearchKeys).map(([column, values]) =>
                  values?.length > 0 ? (
                    <div
                      key={column}
                      className="flex items-center gap-2 px-1  bg-gray-100 border rounded-full text-xs"
                    >
                      <span className="font-semibold capitalize">{column}:</span>
                      <span>{values.join(", ")}</span>
            
                      {/* ❌ REMOVE FILTER */}
                      <button
                        onClick={() => removeColumnFilter(column)}
                        className="text-red-600 font-bold hover:scale-110 transition"
                      >
                        <CircleX size={14}/>
                      </button>
                    </div>
                  ) : null
                )}
              </div>
            )}

      {/* ------------------------------------------------------------------ */}
      {/* 📋 TABLE */}
      {/* ------------------------------------------------------------------ */}
      <div className="overflow-x-auto">
        <EditableTable
          headers={headers}
          rows={paginatedData}
          handleEdit={handleEditClick}
          handleDelete={handleDelete}
          sortConfig={sortConfig}
          onSort={onSort}
          onColumnSearch={handleColumnSearch}
          columnSearchKeys={columnSearchKeys}
        />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 📄 PAGINATION */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex justify-center">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          totalRecords={dataList.length}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 🟢 ADD MODAL */}
      {/* ------------------------------------------------------------------ */}
      <ModalCom
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Product Type"
        content={
          <AddProductType
            dataList={dataList}
            setDataList={setDataList}
            onClose={() => setIsAddModalOpen(false)}
          />
        }
      />

      {/* ------------------------------------------------------------------ */}
      {/* ✏️ EDIT MODAL */}
      {/* ------------------------------------------------------------------ */}
      <ModalCom
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Product Type"
        content={
          <EditProductType
            selectedData={selectedData}
            dataList={dataList}
            setDataList={setDataList}
            onClose={() => setIsEditModalOpen(false)}
          />
        }
      />
    </div>
  );
};

export default ShowTypeProduct;
