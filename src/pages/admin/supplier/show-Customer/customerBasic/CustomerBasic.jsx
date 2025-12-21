import React, { useEffect, useState } from "react";
import { PlusCircle , CircleX} from "lucide-react";
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

  const [columnSearchKeys, setColumnSearchKeys] = useState({});

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
       case "activeStatus":
         updated = updated.filter((item) => item.activeStatus === true);
         break;
       case "inactive":
         updated = updated.filter((item) => item.activeStatus === false);
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
        <DownloadDataButton data={filteredData} fileName="Customer Details" />

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-1 rounded-lg text-white text-xs font-semibold shadow"
          style={{ background: "var(--color-primary)" }}
        >
          <PlusCircle size={15} /> Add Supplier
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
            columnSearchKeys={columnSearchKeys}
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
        title="Add Supplier"
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
        title="Update Supplier"
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
