import React, { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import Swal from "sweetalert2";

import ModalCom from "../../../../../components/modalComp/ModalCom";
import AddAssemblyType from "../../../productPage/addProduct/AddAssemblyType";
import EditAssemblyType from "../../../productPage/updateProduct/EditAssemblyType";

import EditableTable from "../../../../../components/tablecomp/EditableTable";
import Pagination from "../../../../../components/pagination/Pagination";
import DownloadDataButton from "../../../../../components/DownloadData/DownloadDataButton";

import { fakeAssemblyTypeData } from "../../../../../components/FakeData";

// Common UI components
import SelectBoxCommon from "../../../../../components/searchComp/SelectBoxCommon";

const ShowAssemblyType = () => {
  /** --------------------------------------------------------------------
   *  🔹 STATE MANAGEMENT
   * -------------------------------------------------------------------- **/
  const [dataList, setDataList] = useState([]); // Full data
  const [filteredData, setFilteredData] = useState([]); // Filtered + searched data

  const [searchQuery, setSearchQuery] = useState(""); // Search query text
  
  const [filterType, setFilterType] = useState("all"); // Dropdown filter

  const [selectedData, setSelectedData] = useState(null); // Selected row for edit modal

  // Modals state (Add / Edit)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Sorting & Pagination
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  

  /** --------------------------------------------------------------------
   *  🔹 LOAD INITIAL DATA
   * -------------------------------------------------------------------- **/
  useEffect(() => {
    setDataList(fakeAssemblyTypeData);
    setFilteredData(fakeAssemblyTypeData);
  }, []);

  /** --------------------------------------------------------------------
   *  🔹 APPLY FILTERS + SEARCH
   * -------------------------------------------------------------------- **/
  /** -------------------- FILTER + SEARCH -------------------- **/
  useEffect(() => {
    let updated = [...dataList];

    switch (filterType) {
      case "today":
        updated = updated.filter((item) => item.isNew === true);
        break;
      case "active":
        updated = updated.filter((item) => item.status === "active");
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
  /** --------------------------------------------------------------------
   *  🔹 SORTING LOGIC
   * -------------------------------------------------------------------- **/
  const onSort = (key) => {
    let direction = "asc";

    // Toggle between ascending / descending
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });

    const sortedData = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredData(sortedData);
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



  /** --------------------------------------------------------------------
   *  🔹 PAGINATION
   * -------------------------------------------------------------------- **/
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  /** --------------------------------------------------------------------
   *  🔹 DELETE RECORD
   * -------------------------------------------------------------------- **/
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This assembly type will be permanently deleted!",
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

        Swal.fire("Deleted!", "Assembly type deleted successfully.", "success");
      }
    });
  };

  /** --------------------------------------------------------------------
   *  🔹 EDIT HANDLER
   * -------------------------------------------------------------------- **/
  const handleEditClick = (id) => {
    const selected = dataList.find((item) => item.id === id);
    setSelectedData(selected);
    setIsEditModalOpen(true);
  };

  /** --------------------------------------------------------------------
   *  🔹 TABLE HEADERS
   * -------------------------------------------------------------------- **/
  const headers = filteredData.length > 0 ? Object.keys(filteredData[0]) : [];

  /** --------------------------------------------------------------------
   *  🔹 JSX UI
   * -------------------------------------------------------------------- **/
  return (
    <div className="space-y-2 w-full">
      {/* 🔍 FILTERS + ACTION BUTTONS */}

      {/* LEFT SIDE FILTERS */}
        <div className="">

          {/* 🔽 STATUS SELECT BOX */}
          <SelectBoxCommon
             value={filterType}
             onChange={setFilterType}
             dataList={dataList} // pass full data for dynamic counts
          />
        </div>
      <div className="flex flex-col md:flex-row justify-end md:items-center gap-3">
        

        {/* RIGHT SIDE ACTIONS */}
        <div className="flex items-center gap-3">
          {/* ⬇ DOWNLOAD */}
          <DownloadDataButton data={dataList} fileName="AssemblyType" />

          {/* ➕ ADD BUTTON */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-1 rounded-lg text-white text-xs font-semibold shadow transition-all duration-300 hover:shadow-lg"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            <PlusCircle size={12} />
            Add Assembly Type
          </button>
        </div>
      </div>

      {/* 📋 MAIN TABLE */}
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

      {/* 📄 PAGINATION */}
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

      {/* ➕ ADD MODAL */}
      <ModalCom
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Assembly Type"
        content={
          <AddAssemblyType
            dataList={dataList}
            setDataList={setDataList}
            onClose={() => setIsAddModalOpen(false)}
          />
        }
      />

      {/* ✏️ EDIT MODAL */}
      <ModalCom
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Assembly Type"
        content={
          <EditAssemblyType
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

export default ShowAssemblyType;
