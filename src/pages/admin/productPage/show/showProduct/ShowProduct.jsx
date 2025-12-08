import React, { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import Swal from "sweetalert2";

import ModalCom from "../../../../../components/modalComp/ModalCom";
import { fakeMainProductData } from "../../../../../components/FakeData";

import EditableTable from "../../../../../components/tablecomp/EditableTable";
import Pagination from "../../../../../components/pagination/Pagination";

import AddProduct from "../../addProduct/AddProduct";
import UpdateProduct from "../../updateProduct/UpdateProduct";
import DownloadDataButton from "../../../../../components/DownloadData/DownloadDataButton";

// 🔍 Common Components
import SelectBoxCommon from "../../../../../components/searchComp/SelectBoxCommon";

const ShowProduct = () => {
  // ==================================================================
  // 🔹 STATE MANAGEMENT
  // ==================================================================
  const [dataList, setDataList] = useState([]); // All products
  const [filteredData, setFilteredData] = useState([]); // List after search/filter

  const [searchQuery, setSearchQuery] = useState(""); // Search text
  const [filterType, setFilterType] = useState("all"); // Dropdown filter type

  // Modal & Selection State
  const [selectedData, setSelectedData] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Table Editing (inline editing optional — currently disabled)
  const [editRowId, setEditRowId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const editableFields = []; // You can add fields to allow inline editing

  const [columnSearchKeys, setColumnSearchKeys] = useState({});


  // Sorting
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(2);

  // ==================================================================
  // 📌 LOAD INITIAL PRODUCT DATA
  // ==================================================================
  useEffect(() => {
    setDataList(fakeMainProductData);
    setFilteredData(fakeMainProductData);
  }, []);

  // ==================================================================
  // 🔍 FILTER + SEARCH LOGIC
  // ==================================================================
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

  // ==================================================================
  // 🔽 SORTING LOGIC
  // ==================================================================
  const onSort = (key) => {
    let direction = "asc";

    // Toggle sorting direction if same column clicked
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });

    // Perform sorting
    const sorted = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredData(sorted);
  };


    // ==============================
  // COLUMN SEARCH
  // ==============================
  // const handleColumnSearch = (header, value) => {
  //   const updated = dataList.filter((item) =>
  //     String(item[header] || "")
  //       .toLowerCase()
  //       .includes(value.toLowerCase())
  //   );

  //   setFilteredData(updated);
  //   setCurrentPage(1);
  // };
 
  
  // COLUMN SEARCH
const handleColumnSearch = (header, keys) => {
  // Update stored keys
  setColumnSearchKeys(prev => ({
    ...prev,
    [header]: keys,
  }));

  // Apply filters
  applyFilters({
    ...columnSearchKeys,
    [header]: keys
  });
};

const applyFilters = (allKeys) => {
  let result = [...dataList];  // ✅ use dataList as original full rows

  Object.keys(allKeys).forEach(col => {
    const keys = allKeys[col];
    if (!keys || keys.length === 0) return;

    // Filter rows where all keys are included
    result = result.filter(row =>
      keys.every(key =>
        String(row[col] ?? "")
          .toLowerCase()
          .includes(key.toLowerCase())
      )
    );
  });

  setFilteredData(result);  // ✅ update filteredData which the table uses
  setCurrentPage(1);        // reset pagination
};


  // ==================================================================
  // 📄 PAGINATION CALCULATION
  // ==================================================================
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // ==================================================================
  // ➕ OPEN ADD PRODUCT MODAL
  // ==================================================================
  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  // ==================================================================
  // ✏️ OPEN EDIT PRODUCT MODAL
  // ==================================================================
  const openEditModal = (id) => {
    const row = dataList.find((item) => item.id === id);
    setSelectedData(row);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setSelectedData(null);
    setIsEditModalOpen(false);
  };

  // ==================================================================
  // 🗑️ DELETE PRODUCT WITH CONFIRMATION
  // ==================================================================
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This record will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor:
        getComputedStyle(document.documentElement)
          .getPropertyValue("--color-primary")
          .trim() || "#16a34a",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setDataList((prev) => prev.filter((item) => item.id !== id));
        setFilteredData((prev) => prev.filter((item) => item.id !== id));
        Swal.fire("Deleted!", "Record has been removed.", "success");
      }
    });
  };

  // ==================================================================
  // 🏷️ TABLE HEADERS
  // ==================================================================
  const headers = filteredData.length > 0 ? Object.keys(filteredData[0]) : [];

  // ==================================================================
  // 🖥️ MAIN VIEW
  // ==================================================================
  return (
    <div className="space-y-2 w-full">

      {/* =============================================================
          🔍 FILTER + DOWNLOAD + ADD BUTTON
      =============================================================== */}


        {/* LEFT CONTROLS */}
        <div className="">

          {/* Filter Dropdown */}
          <SelectBoxCommon
             value={filterType}
             onChange={setFilterType}
             dataList={dataList} // pass full data for dynamic counts
          />
        </div>

      <div className="flex flex-col md:flex-row justify-end md:items-center gap-3">

      

        {/* RIGHT CONTROLS */}
        <div className="flex items-center gap-3">

          {/* Excel / CSV / PDF Download */}
          <DownloadDataButton data={dataList} fileName="Product Detail" />

          {/* Add Product Button */}
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-1 rounded-lg text-white text-xs font-semibold shadow transition-all duration-300 hover:shadow-lg"
            style={{ backgroundColor: "var(--color-primary)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "var(--color-primary-hover)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--color-primary)")
            }
          >
            <PlusCircle size={16} />
            Add Product
          </button>
        </div>
      </div>

      {/* =============================================================
          📋 PRODUCT TABLE
      =============================================================== */}
      <EditableTable
        headers={headers}
        rows={paginatedData}
        editRowId={editRowId}
        editedData={editedData}
        handleEdit={openEditModal}
        handleDelete={handleDelete}
        editableFields={editableFields}
        sortConfig={sortConfig}
        onSort={onSort}
        onColumnSearch={handleColumnSearch}
        columnSearchKeys={columnSearchKeys}   // NEW


      />

      {/* =============================================================
          📄 PAGINATION
      =============================================================== */}
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

      {/* =============================================================
          ➕ ADD PRODUCT MODAL
      =============================================================== */}
      <ModalCom
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        title="Add Product"
        iconType="success"
        content={
          <AddProduct dataList={dataList} setDataList={setDataList} />
        }
      />

      {/* =============================================================
          ✏️ EDIT PRODUCT MODAL
      =============================================================== */}
      <ModalCom
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        title="Edit Product"
        iconType="info"
        content={
          <UpdateProduct
            selectedData={selectedData}
            dataList={dataList}
            setDataList={setDataList}
            closeEditModal={closeEditModal}
          />
        }
      />
    </div>
  );
};

export default ShowProduct;
