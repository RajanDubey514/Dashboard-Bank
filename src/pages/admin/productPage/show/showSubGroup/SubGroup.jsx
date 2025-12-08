import React, { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import Swal from "sweetalert2";

// COMPONENTS
import ModalCom from "../../../../../components/modalComp/ModalCom";
import EditableTable from "../../../../../components/tablecomp/EditableTable";
import Pagination from "../../../../../components/pagination/Pagination";
import DownloadDataButton from "../../../../../components/DownloadData/DownloadDataButton";
import AddSubMainForm from "../../../productPage/addProduct/AddSubMainForm";
import EditSubMainForm from "../../../productPage/updateProduct/EditSubMainForm";
import { FakeSubMainGroupData } from "../../../../../components/FakeData";

// COMMON COMPONENTS
import SearchBarCommon from "../../../../../components/searchComp/SearchBar";
import SelectBoxCommon from "../../../../../components/searchComp/SelectBoxCommon";

const SubMainGroup = () => {
  // ---------------------------------------------------------------------
  // STATE MANAGEMENT
  // ---------------------------------------------------------------------

  const [dataList, setDataList] = useState([]);          // Full list
  const [filteredData, setFilteredData] = useState([]);  // After search/filter
  const [searchQuery, setSearchQuery] = useState("");    // Search input
  const [filterType, setFilterType] = useState("all");   // Filter type
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Add/Edit Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  // ---------------------------------------------------------------------
  // LOAD INITIAL DATA
  // ---------------------------------------------------------------------
  useEffect(() => {
    setDataList(FakeSubMainGroupData);
    setFilteredData(FakeSubMainGroupData);
  }, []);

  // ---------------------------------------------------------------------
  // FILTER + SEARCH HANDLING
  // ---------------------------------------------------------------------
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

  // ---------------------------------------------------------------------
  // SORTING
  // ---------------------------------------------------------------------
  const onSort = (key) => {
    let direction = "asc";

    // Toggle sort direction
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
  

  // ---------------------------------------------------------------------
  // DELETE RECORD
  // ---------------------------------------------------------------------
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This SubMain record will be permanently deleted!",
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

        Swal.fire("Deleted!", "SubMain deleted successfully.", "success");
      }
    });
  };

  // ---------------------------------------------------------------------
  // PAGINATION
  // ---------------------------------------------------------------------
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const headers = filteredData.length > 0 ? Object.keys(filteredData[0]) : [];

  // ---------------------------------------------------------------------
  // ADD / EDIT HANDLERS
  // ---------------------------------------------------------------------
  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleEditClick = (id) => {
    const selected = dataList.find((item) => item.id === id);
    setSelectedData(selected);
    setIsEditModalOpen(true);
  };

  // ---------------------------------------------------------------------
  // UI RENDER
  // ---------------------------------------------------------------------
  return (
    <div className="space-y-2 w-full">

      {/* ---------------------------------------------------
        TOP BAR → SEARCH + FILTER + ACTIONS
      ----------------------------------------------------- */}

        {/* LEFT SIDE: Search + Filter */}
        <div className="">
          
          {/* Filter dropdown */}
          <SelectBoxCommon
             value={filterType}
             onChange={setFilterType}
             dataList={dataList} // pass full data for dynamic counts
          />
        </div>

      <div className="flex flex-col md:flex-row justify-end md:items-center gap-3">

        {/* RIGHT SIDE: Download + Add Button */}
        <div className="flex items-center gap-3">
          <DownloadDataButton data={dataList} fileName="SubMainGroupDetails" />

          <button
            onClick={handleAddClick}
            className="flex items-center gap-2 px-4 py-1 rounded-lg text-white text-xs font-semibold shadow transition-all duration-300 hover:shadow-lg"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            <PlusCircle size={12} />
            Add Sub Main
          </button>
        </div>
      </div>

      {/* ---------------------------------------------------
        TABLE
      ----------------------------------------------------- */}
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

      {/* ---------------------------------------------------
        PAGINATION
      ----------------------------------------------------- */}
      <div className="flex justify-center ">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          totalRecords={dataList.length}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      </div>

      {/* ---------------------------------------------------
        ADD MODAL
      ----------------------------------------------------- */}
      <ModalCom
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Sub Main"
        content={
          <AddSubMainForm
            dataList={dataList}
            setDataList={setDataList}
            onClose={() => setIsAddModalOpen(false)}
          />
        }
      />

      {/* ---------------------------------------------------
        EDIT MODAL
      ----------------------------------------------------- */}
      <ModalCom
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Sub Main"
        content={
          <EditSubMainForm
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

export default SubMainGroup;
