import React, { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import Swal from "sweetalert2";

import ModalCom from "../../../../../components/modalComp/ModalCom";
import EditableTable from "../../../../../components/tablecomp/EditableTable";
import Pagination from "../../../../../components/pagination/Pagination";
import DownloadDataButton from "../../../../../components/DownloadData/DownloadDataButton";

import AddGroupForm from "../../../productPage/addProduct/AddGroupForm";
import EditGroupForm from "../../../productPage/updateProduct/EditGroupForm";
import { FakeGroupData } from "../../../../../components/FakeData";

// ✅ COMMON COMPONENTS
import SelectBoxCommon from "../../../../../components/searchComp/SelectBoxCommon";

const MainGroup = () => {
  // ===========================
  // 🗂️ STATE MANAGEMENT
  // ===========================
  const [dataList, setDataList] = useState([]); // Original data
  const [filteredData, setFilteredData] = useState([]); // Filtered + searched data

  const [searchQuery, setSearchQuery] = useState(""); // Search input value
  const [filterType, setFilterType] = useState("all"); // Filter dropdown value

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Add modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Edit modal
  const [selectedData, setSelectedData] = useState(null); // Edit selected row



  // ===========================
  // 📌 LOAD INITIAL DATA
  // ===========================
  useEffect(() => {
    setDataList(FakeGroupData);
    setFilteredData(FakeGroupData);
  }, []);



  // ===========================
  // 🔍 FILTER + SEARCH LOGIC
  // ===========================
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



  // ===========================
  // 🔽 SORTING LOGIC
  // ===========================
  const onSort = (key) => {
    let direction = "asc";

    // If sorted already → toggle direction
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



  // ===========================
  // 🗑️ DELETE RECORD
  // ===========================
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This group will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updated = dataList.filter((item) => item.id !== id);
        setDataList(updated);
        setFilteredData(updated);

        Swal.fire("Deleted!", "Group deleted successfully.", "success");
      }
    });
  };



  // ===========================
  // 📄 PAGINATION
  // ===========================
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const headers = filteredData.length > 0 ? Object.keys(filteredData[0]) : [];



  // ===========================
  // ➕ ADD GROUP
  // ===========================
  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };



  // ===========================
  // ✏️ EDIT GROUP
  // ===========================
  const handleEditClick = (id) => {
    const selected = dataList.find((item) => item.id === id);
    setSelectedData(selected);
    setIsEditModalOpen(true);
  };



  return (
    <div className="space-y-2 w-full">

      {/* ===========================
          🔍 TOP FILTERS + BUTTONS
      ============================== */}

        {/* Left: Filters */}
        <div className="">
          {/* Dropdown Filter */}
          <SelectBoxCommon
           value={filterType}
             onChange={setFilterType}
             dataList={dataList} // pass full data for dynamic counts
          />
        </div>

      <div className="flex flex-col md:flex-row justify-end md:items-center gap-3">
        {/* Right: Download + Add */}
        <div className="flex items-center gap-3">
          <DownloadDataButton data={dataList} fileName="GroupDetails" />

          <button
            onClick={handleAddClick}
            className="flex items-center gap-2 px-4 py-1 rounded-lg text-white text-xs font-semibold shadow transition-all duration-300 hover:shadow-lg"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            <PlusCircle size={12} />
            Add Group
          </button>
        </div>
      </div>



      {/* ===========================
          📋 GROUP TABLE
      ============================== */}
      <div className="overflow-x-auto">
        <EditableTable
          headers={headers}
          rows={paginatedData}
          handleEdit={handleEditClick}
          handleDelete={handleDelete}
          sortConfig={sortConfig}
          onSort={onSort}
          onColumnSearch={handleColumnSearch}

        />
      </div>



      {/* ===========================
          📄 PAGINATION
      ============================== */}
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



      {/* ===========================
          ➕ ADD MODAL
      ============================== */}
      <ModalCom
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Group"
        content={
          <AddGroupForm
            dataList={dataList}
            setDataList={setDataList}
            onClose={() => setIsAddModalOpen(false)}
          />
        }
      />



      {/* ===========================
          ✏️ EDIT MODAL
      ============================== */}
      <ModalCom
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Group"
        content={
          <EditGroupForm
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

export default MainGroup;
