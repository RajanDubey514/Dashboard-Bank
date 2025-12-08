import React, { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import Swal from "sweetalert2";

// CUSTOM COMPONENTS
import ModalCom from "../../../../../components/modalComp/ModalCom";
import AddCustomerBasic from "../../add-Customer/AddCustomerBasic/AddCustomerBasic";
import EditCustomerBasic from "../../edit-Customer/editCustomerBasic/EditCustomerBasic";
import EditableTable from "../../../../../components/tablecomp/EditableTable";
import Pagination from "../../../../../components/pagination/Pagination";
import DownloadDataButton from "../../../../../components/DownloadData/DownloadDataButton";
import SelectBoxCommon from "../../../../../components/searchComp/SelectBoxCommon";

// FAKE DATA SOURCE
import { FakeCustomerData } from "../../../../../components/FakeData";


// ========================================================================
// 📌 MAIN COMPONENT : CUSTOMER BASIC DETAILS
// ========================================================================

const CustomerBasic = () => {

  // ========================================================================
  // 🔹 STATES: DATA, FILTER, SEARCH, SORT, PAGINATION
  // ========================================================================
  const [dataList, setDataList] = useState([]);         // Original data list
  const [filteredData, setFilteredData] = useState([]); // After filters/search

  const [searchQuery, setSearchQuery] = useState("");   // Global Search

  const [filterType, setFilterType] = useState("all");  // Filter dropdown

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // ========================================================================
  // 🔹 MODAL STATES
  // ========================================================================
  const [selectedData, setSelectedData] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);


  // ========================================================================
  // 🔥 LOAD INITIAL DATA
  // ========================================================================
  useEffect(() => {
    setDataList(FakeCustomerData);
    setFilteredData(FakeCustomerData);
  }, []);


  // ========================================================================
  // 🔥 APPLY FILTERS + SEARCH
  // ========================================================================
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


  // ========================================================================
  // 🔥 SORTING FUNCTION
  // ========================================================================
  const onSort = (key) => {
    let direction = "asc";

    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });

    setFilteredData((prev) =>
      [...prev].sort((a, b) => {
        const A = String(a[key]).toLowerCase();
        const B = String(b[key]).toLowerCase();
        if (A < B) return direction === "asc" ? -1 : 1;
        if (A > B) return direction === "asc" ? 1 : -1;
        return 0;
      })
    );
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



  // ========================================================================
  // 🔥 PAGINATION
  // ========================================================================
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );


  // ========================================================================
  // 🔥 MODAL HANDLERS
  // ========================================================================
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


  // ========================================================================
  // ❌ DELETE CUSTOMER
  // ========================================================================
  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Customer?",
      text: "This record will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--color-primary)",
      cancelButtonColor: "#ef4444",
    }).then((yes) => {
      if (yes.isConfirmed) {
        const updated = dataList.filter((item) => item.id !== id);
        setDataList(updated);
        setFilteredData(updated);

        Swal.fire("Deleted!", "Record has been removed.", "success");
      }
    });
  };


  // ========================================================================
  // 🔥 AUTO-GENERATE TABLE HEADERS
  // ========================================================================
  const headers = filteredData.length > 0 ? Object.keys(filteredData[0]) : [];


  // ========================================================================
  // 📌 RENDER UI
  // ========================================================================
  return (
    <div className="space-y-2 w-full">

      {/* ================================================================
          FILTER + DOWNLOAD + ADD BUTTONS
      ================================================================ */}
      <div>
        <SelectBoxCommon
            value={filterType}
             onChange={setFilterType}
             dataList={dataList} // pass full data for dynamic counts
        />
      </div>

      <div className="flex justify-end gap-3">
        <DownloadDataButton data={filteredData} fileName="CustomerDetails" />

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-1 rounded-lg text-white text-xs font-semibold shadow"
          style={{ background: "var(--color-primary)" }}
        >
          <PlusCircle size={15} /> Add Customer
        </button>
      </div>


      {/* ================================================================
          NO DATA MESSAGE
      ================================================================ */}
      {filteredData.length === 0 ? (
        <div className="text-center py-8 text-gray-500 font-medium">
          No Records Found
        </div>
      ) : (
        <>
          {/* ================================================================
              TABLE
          ================================================================ */}
          <EditableTable
            headers={headers}
            rows={paginatedData}
            handleEdit={openEditModal}
            handleDelete={handleDelete}
            sortConfig={sortConfig}
            onSort={onSort}
            onColumnSearch={handleColumnSearch}
          />

          {/* ================================================================
              PAGINATION
          ================================================================ */}
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

        </>
      )}

      {/* ================================================================
          ADD MODAL
      ================================================================ */}
      <ModalCom
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        title="Add Customer"
        content={
          <AddCustomerBasic
            dataList={dataList}
            setDataList={setDataList}
          />
        }
      />

      {/* ================================================================
          EDIT MODAL
      ================================================================ */}
      <ModalCom
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        title="Edit Customer"
        content={
          <EditCustomerBasic
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

export default CustomerBasic;
