import React, { useEffect, useState } from "react";
import { PlusCircle , CircleX } from "lucide-react";
import Swal from "sweetalert2";

import ModalCom from "../../../../../components/modalComp/ModalCom";
import AddBranchsDetail from "../../add-Customer/addBranchsDetail/AddBranchsDetail";
import EditBranchsDetail from "../../edit-Customer/editBranchsDetail/EdiitBranchsDetail";

import EditableTable from "../../../../../components/tablecomp/EditableTable";
import Pagination from "../../../../../components/pagination/Pagination";

import SelectBoxCommon from "../../../../../components/searchComp/SelectBoxCommon";
import DownloadDataButton from "../../../../../components/DownloadData/DownloadDataButton";

import { FakeBranchData } from "../../../../../components/FakeData";

const BranchsDetail = () => {
  // ==============================
  // STATES
  // ==============================
  const [dataList, setDataList] = useState([]); // Original data
  const [filteredData, setFilteredData] = useState([]); // After filter/search
  const [searchQuery, setSearchQuery] = useState("");

  const [filterType, setFilterType] = useState("all"); // Active/Inactive filter

  const [selectedData, setSelectedData] = useState(null); // Edit row data
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);

      const [columnSearchKeys, setColumnSearchKeys] = useState({});
  

  // ==============================
  // INITIAL DATA LOAD
  // ==============================
  useEffect(() => {
    setDataList(FakeBranchData);
    setFilteredData(FakeBranchData);
  }, []);

  // ==============================
  // FILTER + SEARCH APPLIED
  // ==============================
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

  // ==============================
  // SORT FUNCTION
  // ==============================

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

  // ==============================
  // PAGINATION LOGIC
  // ==============================
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // ==============================
  // MODAL HANDLERS
  // ==============================
  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const openEditModal = (id) => {
    const row = dataList.find((item) => item.id === id);
    setSelectedData(row);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedData(null);
    setIsEditModalOpen(false);
  };

  // ==============================
  // DELETE FUNCTION
  // ==============================
  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete?",
      text: "This record will be permanently removed",
      icon: "warning",
      showCancelButton: true,
    }).then((yes) => {
      if (yes.isConfirmed) {
        const updated = dataList.filter((item) => item.id !== id);
        setDataList(updated);
        setFilteredData(updated);
      }
    });
  };

  // ==============================
  // TABLE HEADERS AUTOMATIC
  // ==============================
  const headers = filteredData.length > 0 ? Object.keys(filteredData[0]) : [];

  // ==============================
  // RENDER UI
  // ==============================
  return (
    <div className="space-y-2 w-full">

      {/* ==================================================================================
           FILTERS + ADD BUTTON + DOWNLOAD
      ===================================================================================*/}

      <div className="">
         {/* FILTER: Active / Inactive */}
        <SelectBoxCommon
             value={filterType}
             onChange={setFilterType}
             dataList={dataList} // pass full data for dynamic counts
        />
      </div>
      <div className="flex flex-wrap justify-end items-center gap-3">
        {/* DOWNLOAD BUTTON */}
        <DownloadDataButton data={dataList} fileName="Branch Details" />

        {/* ADD NEW BRANCH BUTTON */}
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-1 rounded-lg text-white text-xs font-semibold"
          style={{ background: "var(--color-primary)" }}
        >
          <PlusCircle size={13} /> Add Branch
        </button>
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

      {/* ==============================
          TABLE
      ============================== */}
      <EditableTable
        headers={headers}
        rows={paginatedData}
        handleEdit={openEditModal}
        handleDelete={handleDelete}
        sortConfig={sortConfig}
        onSort={onSort}
        onColumnSearch={handleColumnSearch}
        columnSearchKeys={columnSearchKeys}

      />

      {/* ==============================
          PAGINATION
      ============================== */}
       <div className="flex justify-center">
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        totalRecords={filteredData.length}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
       </div>

      {/* ==============================
          ADD MODAL
      ============================== */}
      <ModalCom
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        title="Add Branch"
        content={
          <AddBranchsDetail 
            dataList={dataList} 
            setDataList={setDataList} 
          />
        }
      />

      {/* ==============================
          EDIT MODAL
      ============================== */}
      <ModalCom
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        title="Edit Branch"
        content={
          <EditBranchsDetail
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

export default BranchsDetail;
