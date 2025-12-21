import React, { useEffect, useState } from "react";
import { PlusCircle, CircleX } from "lucide-react";
import Swal from "sweetalert2";

// CUSTOM COMPONENTS
import ModalCom from "../../../../../components/modalComp/ModalCom";
import AddFollowUpActivity from "../../add-Customer/AddFollowUpActivity/AddFollowUpActivity";
import EditFollowUpActivity from "../../edit-Customer/editFollowUpActivity/EditFollowUpActivity";
import EditableTable from "../../../../../components/tablecomp/EditableTable";
import Pagination from "../../../../../components/pagination/Pagination";
import DownloadDataButton from "../../../../../components/DownloadData/DownloadDataButton";

// COMMON FILTER COMPONENTS
import SearchBarCommon from "../../../../../components/searchComp/SearchBar";
import SelectBoxCommon from "../../../../../components/searchComp/SelectBoxCommon";

// FAKE DATA
import { FakeFollowUpActivityData } from "../../../../../components/FakeData";


const FollowUpActivity = () => {
  // ----------------------------------------------------------------------------
  // 🔹 STATES : Data, Filter, Search, Sort, Pagination
  // ----------------------------------------------------------------------------
  const [dataList, setDataList] = useState([]);         // Main complete data list
  const [filteredData, setFilteredData] = useState([]); // Filter + Search result list
  const [searchQuery, setSearchQuery] = useState("");   // Search input
  const [filterType, setFilterType] = useState("all");  // Dropdown filter

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // ----------------------------------------------------------------------------
  // 🔹 Modal States
  // ----------------------------------------------------------------------------
  const [selectedData, setSelectedData] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [columnSearchKeys, setColumnSearchKeys] = useState({});
  

  // Inline editing (not used but needed for table props)
  const [editRowId, setEditRowId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const editableFields = [];

  // ============================================================================
  // 🔥 LOAD INITIAL DATA ONCE
  // ============================================================================
  useEffect(() => {
    setDataList(FakeFollowUpActivityData);
    setFilteredData(FakeFollowUpActivityData);
  }, []);

  // ============================================================================
  // 🔥 APPLY FILTERS + SEARCH
  // ============================================================================
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

  // ============================================================================
  // 🔥 SORTING FUNCTION
  // ============================================================================
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

  // ============================================================================
  // 🔢 PAGINATION
  // ============================================================================
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // ============================================================================
  // 🔥 OPEN / CLOSE MODALS
  // ============================================================================
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

  // ============================================================================
  // ❌ DELETE RECORD
  // ============================================================================
  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Activity?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--color-primary)",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        const updated = dataList.filter((item) => item.id !== id);
        setDataList(updated);
        setFilteredData(updated);

        Swal.fire("Deleted!", "Activity removed successfully.", "success");
      }
    });
  };

  // ============================================================================
  // 🔥 TABLE HEADERS
  // ============================================================================
  const headers = filteredData.length > 0 ? Object.keys(filteredData[0]) : [];

  // ============================================================================
  // 📌 UI RENDER
  // ============================================================================
  return (
    <div className="space-y-2 w-full">

      {/* ============================================================= */}
      {/* 🔍 TOP SECTION : Filter + Search + Download + Add Button */}
      {/* ============================================================= */}

      <div>
          {/* 🔽 Filter Dropdown */}
        <SelectBoxCommon
            value={filterType}
             onChange={setFilterType}
             dataList={dataList} // pass full data for dynamic counts
        />

      </div>

      <div className="flex flex-col md:flex-row justify-end md:items-center gap-3">

        {/* Right Controls */}
        <div className="flex items-center gap-3">

          {/* 📥 Download Button */}
          <DownloadDataButton
            data={dataList}
            fileName="Follow-Up-Activity"
          />

          {/* ➕ Add Follow Up Activity */}
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-1 rounded-lg text-white text-xs font-semibold shadow 
                     transition-all duration-300 hover:shadow-lg"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            <PlusCircle size={16} /> Add Follow-Up Activity
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

      {/* ============================================================= */}
      {/* 📋 TABLE SECTION */}
      {/* ============================================================= */}
      <div className="overflow-x-auto">
        <EditableTable
          headers={headers}
          rows={paginatedData}
          editRowId={editRowId}
          editedData={editedData}
          editableFields={editableFields}
          handleEdit={openEditModal}
          handleDelete={handleDelete}
          sortConfig={sortConfig}
          onSort={onSort}
          onColumnSearch={handleColumnSearch}
          columnSearchKeys={columnSearchKeys}
          
        />
      </div>

      {/* ============================================================= */}
      {/* 🔢 PAGINATION */}
      {/* ============================================================= */}
      <div className="flex justify-center ">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          totalRecords={filteredData.length}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      </div>

      {/* ============================================================= */}
      {/* ➕ ADD MODAL */}
      {/* ============================================================= */}
      <ModalCom
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        title="Add Follow-Up Activity"
        content={
          <AddFollowUpActivity
            dataList={dataList}
            setDataList={setDataList}
          />
        }
      />

      {/* ============================================================= */}
      {/* ✏️ EDIT MODAL */}
      {/* ============================================================= */}
      <ModalCom
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        title="Edit Follow-Up Activity"
        content={
          <EditFollowUpActivity
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

export default FollowUpActivity;
