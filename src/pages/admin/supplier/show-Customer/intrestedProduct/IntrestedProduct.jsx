import React, { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import Swal from "sweetalert2";

import ModalCom from "../../../../../components/modalComp/ModalCom";
import AddIntrestedProduct from "../../add-Customer/AddIntrestedProduct/AddIntrestedProduct";
import EditIntrestedProduct from "../../edit-Customer/editIntrestedProduct/EditIntrestedProduct";

import EditableTable from "../../../../../components/tablecomp/EditableTable";
import Pagination from "../../../../../components/pagination/Pagination";
import { FakeInterestedProductData } from "../../../../../components/FakeData";

import DownloadDataButton from "../../../../../components/DownloadData/DownloadDataButton";

// Common Components
import SelectBoxCommon from "../../../../../components/searchComp/SelectBoxCommon";

const IntrestedProduct = () => {
  /** ---------------------------------------------
   *  🔹 STATE MANAGEMENT
   * ---------------------------------------------- */
  const [dataList, setDataList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [filterType, setFilterType] = useState("all");

  // Modal states
  const [selectedData, setSelectedData] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Sorting & Pagination
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  /** ---------------------------------------------
   *  🔹 LOAD INITIAL DATA
   * ---------------------------------------------- */
  useEffect(() => {
    setDataList(FakeInterestedProductData);
    setFilteredData(FakeInterestedProductData);
  }, []);

  /** ---------------------------------------------
   *  🔹 APPLY FILTER + SEARCH
   * ---------------------------------------------- */
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

  /** ---------------------------------------------
   *  🔹 SORTING LOGIC
   * ---------------------------------------------- */
  const onSort = (key) => {
    let direction = "asc";

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


  /** ---------------------------------------------
   *  🔹 PAGINATION
   * ---------------------------------------------- */
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  /** ---------------------------------------------
   *  🔹 MODAL HANDLERS
   * ---------------------------------------------- */
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

  /** ---------------------------------------------
   *  🔹 DELETE RECORD
   * ---------------------------------------------- */
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This product will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updated = dataList.filter((item) => item.id !== id);

        setDataList(updated);
        setFilteredData(updated);

        Swal.fire("Deleted!", "Product removed successfully.", "success");
      }
    });
  };

  /** ---------------------------------------------
   *  🔹 TABLE HEADERS
   * ---------------------------------------------- */
  const headers = filteredData.length > 0 ? Object.keys(filteredData[0]) : [];

  /** ---------------------------------------------
   *  🔹 JSX RETURN
   * ---------------------------------------------- */
  return (
    <div className="space-y-2 w-full">
      {/* 🔍 FILTER + ADD BUTTON SECTION */}

         {/* LEFT FILTERS */}
        <div className="">
          <SelectBoxCommon
             value={filterType}
             onChange={setFilterType}
             dataList={dataList} // pass full data for dynamic counts
          />
        </div>
      <div className="flex flex-wrap justify-end items-center gap-3">

        {/* RIGHT ACTION BUTTONS */}
        <div className="flex items-center gap-3">
          <DownloadDataButton data={dataList} fileName="Interested-Product" />

          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-1 rounded-lg text-white text-xs font-semibold shadow transition-all duration-300 hover:shadow-lg"
            style={{
              backgroundColor: "var(--color-primary)",
            }}
          >
            <PlusCircle size={12} />
            Add Interested Product
          </button>
        </div>
      </div>

      {/* 📋 TABLE */}
      <EditableTable
        headers={headers}
        rows={paginatedData}
        handleEdit={openEditModal}
        handleDelete={handleDelete}
        sortConfig={sortConfig}
        onSort={onSort}
          onColumnSearch={handleColumnSearch}

      />

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
        onClose={closeAddModal}
        title="Add Interested Product"
        content={
          <AddIntrestedProduct
            dataList={dataList}
            setDataList={setDataList}
          />
        }
      />

      {/* ✏️ EDIT MODAL */}
      <ModalCom
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        title="Edit Interested Product"
        content={
          <EditIntrestedProduct
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

export default IntrestedProduct;
