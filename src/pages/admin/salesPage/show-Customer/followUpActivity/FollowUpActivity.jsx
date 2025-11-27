import React, { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
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

// ============================================================================
// 📌 MAIN COMPONENT
// ============================================================================

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
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });

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
  const handleColumnSearch = (header, value) => {
    const updated = dataList.filter((item) =>
      String(item[header] || "")
        .toLowerCase()
        .includes(value.toLowerCase())
    );

    setFilteredData(updated);
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
    <div className="p-2 md:p-3 space-y-5 w-full">

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
            className="flex items-center gap-2 px-4 py-1 rounded-lg text-white text-sm font-semibold shadow 
                     transition-all duration-300 hover:shadow-lg"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            <PlusCircle size={16} /> Add Follow-Up Activity
          </button>
        </div>
      </div>

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

        />
      </div>

      {/* ============================================================= */}
      {/* 🔢 PAGINATION */}
      {/* ============================================================= */}
      <div className="flex justify-center pt-2">
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
